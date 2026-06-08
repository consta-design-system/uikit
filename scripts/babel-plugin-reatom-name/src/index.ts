import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import type { CallExpression, VariableDeclarator } from '@babel/types';
import { types as t } from '@babel/core';

interface PluginState extends PluginPass {
  importCache: Map<string, string>;
  generateAtomNameImported: boolean;
}

interface FunctionConfig {
  /** Путь импорта функции (например, '@reatom/core') */
  path: string;
  /** Имя функции (например, 'atom', 'action') */
  functionName: string;
  /**
   * Индекс аргумента, в который нужно вставить имя.
   * - 0 — первый аргумент
   * - 1 — второй аргумент
   */
  argNameIndex: number;
}

type PluginOptions = {
  functionConfig: FunctionConfig[];
};

// ============================================================
// Конфиги для функций из @reatom/core
// ============================================================

const REATOM_CORE_CONFIGS: FunctionConfig[] = [
  { path: '@reatom/core', functionName: 'atom', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'computed', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'action', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'effect', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'reatomBoolean', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'reatomNumber', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'reatomString', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'reatomArray', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'reatomEnum', argNameIndex: 1 },
  { path: '@reatom/core', functionName: 'reatomRecord', argNameIndex: 1 },
];

/**
 * Проверяет, является ли имя функции reatom-функцией (начинается с 'reatom')
 */
function isReatomFunction(name: string): boolean {
  return name.startsWith('reatom');
}

/**
 * Собирает все конфиги: дефолтные для @reatom/core + кастомные из опций.
 * Кастомные конфиги перезаписывают дефолтные при совпадении ключа (path:functionName).
 */
function buildFunctionConfigs(
  defaultConfigs: FunctionConfig[],
  customConfigs: FunctionConfig[],
): FunctionConfig[] {
  const configMap = new Map<string, FunctionConfig>();

  for (const cfg of defaultConfigs) {
    configMap.set(`${cfg.path}:${cfg.functionName}`, cfg);
  }

  for (const cfg of customConfigs) {
    configMap.set(`${cfg.path}:${cfg.functionName}`, cfg);
  }

  return Array.from(configMap.values());
}

/**
 * Находит конфиг для функции по её имени и источнику импорта.
 * Для reatom* функций из @reatom/core создаёт конфиг на лету, если его нет в списке.
 */
function findConfig(
  functionConfigs: FunctionConfig[],
  functionName: string,
  importSource: string,
): FunctionConfig | null {
  // Ищем точное совпадение
  const exact = functionConfigs.find(
    (cfg) => importSource.includes(cfg.path) && cfg.functionName === functionName,
  );
  if (exact) return exact;


  return null;
}

/**
 * Получает имя переменной, в которую присваивается вызов.
 * Обрабатывает:
 * - const X = fn(...)          → 'X'
 * - const X = wrap(fn(...))    → 'X'
 * - const X = fn(...) as Type  → 'X'
 * - export const X = fn(...)   → 'X'
 */
function getVariableName(path: NodePath): string | null {
  const declarator = path.findParent(
    (p) => p.isVariableDeclarator(),
  ) as NodePath<VariableDeclarator> | null;

  if (!declarator) return null;

  const id = declarator.node.id;
  if (t.isIdentifier(id)) {
    return id.name;
  }
  return null;
}

/**
 * Получает имя родительской функции (стрелочной или обычной), внутри которой находится вызов.
 * Обрабатывает:
 * - const myFn = () => { atom(...) }       → 'myFn'
 * - const myFn = function() { atom(...) }  → 'myFn'
 * - function myFn() { atom(...) }          → 'myFn'
 * - export default () => { atom(...) }     → null (нет имени)
 */
function getEnclosingFunctionName(path: NodePath): string | null {
  let current: NodePath | null = path;

  while (current) {
    // Ищем FunctionDeclaration или FunctionExpression со стрелочной функцией
    if (current.isArrowFunctionExpression() || current.isFunctionExpression()) {
      const parent = current.parentPath;
      if (parent) {
        // const myFn = () => { ... }
        if (parent.isVariableDeclarator() && t.isIdentifier(parent.node.id)) {
          return parent.node.id.name;
        }
        // const myFn = function() { ... }
        // obj = { myFn: function() { ... } }
        if (parent.isAssignmentExpression()) {
          if (t.isIdentifier(parent.node.left)) {
            return parent.node.left.name;
          }
          // obj.myFn = function() { ... }
          if (t.isMemberExpression(parent.node.left) && t.isIdentifier(parent.node.left.property)) {
            return parent.node.left.property.name;
          }
        }
      }
    }

    // function myFn() { ... }
    if (current.isFunctionDeclaration()) {
      const id = current.node.id;
      if (id && t.isIdentifier(id)) {
        return id.name;
      }
    }

    // export default () => { ... } — нет имени
    if (current.isExportDefaultDeclaration()) {
      return null;
    }

    // Поднимаемся выше
    current = current.parentPath;
  }

  return null;
}

/**
 * Распаковывает CallExpression из обёрток:
 * - wrap(fn(...)) → fn(...)
 * - fn(...) as Type → fn(...)
 *
 * Возвращает распакованный CallExpression и имя функции.
 */
function unwrapCallExpression(
  path: NodePath,
): { calleeName: string | null; callPath: NodePath<CallExpression> } | null {
  let current: NodePath = path;

  // Если мы внутри wrap(...), берём первый аргумент
  if (
    current.isCallExpression() &&
    t.isIdentifier(current.node.callee) &&
    (current.node.callee as any).name === 'wrap'
  ) {
    const arg = (current.node as CallExpression).arguments[0];
    if (!arg || !t.isCallExpression(arg)) return null;
    const argPath = current.get('arguments')[0];
    if (!argPath || !argPath.isCallExpression()) return null;
    current = argPath;
  }

  // Если мы внутри TSAsExpression (as Type), берём expression
  if (current.parentPath && current.parentPath.isTSAsExpression()) {
    current = current.parentPath.get('expression') as NodePath;
  }

  if (!current.isCallExpression()) return null;

  const callee = current.node.callee;
  let calleeName: string | null = null;

  if (t.isIdentifier(callee)) {
    calleeName = callee.name;
  }

  return { calleeName, callPath: current as NodePath<CallExpression> };
}

/**
 * Проверяет, что по указанному индексу уже есть какой-либо аргумент.
 * Если аргумент есть (любой) — считаем, что имя уже указано и пропускаем.
 */
function hasArgumentAtIndex(
  callPath: NodePath<CallExpression>,
  index: number,
): boolean {
  const args = callPath.node.arguments;
  if (index < 0 || index >= args.length) return false;
  return true;
}

/**
 * Добавляет импорт { generateAtomName } из '##/utils/state/generateAtomName', если его ещё нет.
 */
function ensureGenerateAtomNameImport(path: NodePath, state: PluginState): void {
  if (state.generateAtomNameImported) return;
  state.generateAtomNameImported = true;

  const program = path.findParent((p) => p.isProgram());
  if (!program) return;

  const importStmt = t.importDeclaration(
    [
      t.importSpecifier(
        t.identifier('generateAtomName'),
        t.identifier('generateAtomName'),
      ),
    ],
    t.stringLiteral('##/utils/state/generateAtomName'),
  );

  // Вставляем после последнего импорта
  let insertAfter: NodePath | null = null;
  program.traverse({
    ImportDeclaration(importPath) {
      insertAfter = importPath;
    },
  });

  if (insertAfter) {
    (insertAfter as NodePath).insertAfter(importStmt);
  } else {
    const body = program.get('body');
    if (Array.isArray(body) && body.length > 0) {
      body[0].insertBefore(importStmt);
    }
  }
}

export default function (): PluginObj<PluginState> {
  return {
    name: 'babel-plugin-reatom-name',

    pre() {
      this.importCache = new Map();
      this.generateAtomNameImported = false;

      // Инициализируем конфиги сразу в pre(), чтобы они были доступны
      // до обхода ImportDeclaration
      const pluginOptions = this.opts as PluginOptions;
      const customConfigs = pluginOptions.functionConfig || [];
      (this as any).functionConfigs = buildFunctionConfigs(
        REATOM_CORE_CONFIGS,
        customConfigs,
      );
    },

    visitor: {

      ImportDeclaration(path, state) {
        const pluginState = state as PluginState;
        const node = path.node;
        const source = node.source.value;

        for (const specifier of node.specifiers) {
          if (t.isImportSpecifier(specifier)) {
            const importedName = specifier.local.name;
            pluginState.importCache.set(importedName, source);

            // Если уже импортирован generateAtomName из '##/utils/state/generateAtomName' — запоминаем
            if (
              importedName === 'generateAtomName' &&
              source === '##/utils/state/generateAtomName'
            ) {
              pluginState.generateAtomNameImported = true;
            }
          }
        }
      },

      CallExpression(path, state) {
        const pluginState = state as PluginState;

        // Распаковываем вызов из wrap / as
        const unwrapped = unwrapCallExpression(path);
        if (!unwrapped || !unwrapped.calleeName) return;

        const { calleeName, callPath } = unwrapped;

        // Проверяем, что функция импортирована из нужного источника
        const importSource = pluginState.importCache.get(calleeName);
        if (!importSource) return;

        // Ищем конфиг для этой функции
        const config = findConfig(
          (pluginState as any).functionConfigs,
          calleeName,
          importSource,
        );
        if (!config) return;

        // Если по индексу уже есть аргумент (любой) — пропускаем
        if (hasArgumentAtIndex(callPath, config.argNameIndex)) return;

        // Получаем имя переменной (const X = fn(...)) или имя функции (fn(...))
        const varName = getVariableName(path);
        const name = varName || calleeName;

        // Получаем имя родительской функции, если вызов внутри неё
        const enclosingFnName = getEnclosingFunctionName(path);

        // Добавляем импорт generateAtomName, если ещё не добавили
        ensureGenerateAtomNameImport(path, pluginState);

        // Формируем name-аргумент:
        // - Если есть enclosingFnName: generateAtomName('myFn', 'state')
        // - Если нет: generateAtomName('countAtom')
        const nameArgs: t.StringLiteral[] = [];
        if (enclosingFnName) {
          nameArgs.push(t.stringLiteral(enclosingFnName));
        }
        nameArgs.push(t.stringLiteral(name));

        const nameArg = t.callExpression(
          t.identifier('generateAtomName'),
          nameArgs,
        );

        const args = callPath.node.arguments;

        // Вставляем на нужную позицию
        if (config.argNameIndex >= args.length) {
          // Если аргументов меньше индекса — просто добавляем в конец
          args.push(nameArg);
        } else {
          // Вставляем на нужную позицию
          args.splice(config.argNameIndex, 0, nameArg);
        }
      },
    },
  };
}