# План: Babel-плагин `babel-plugin-reatom-name`

## Проблема

В проекте `@reatom/core` используется для управления состоянием. Функции `atom()`, `computed()`, `action()`, `reatomBoolean()` и другие `reatom*` функции принимают опциональный строковый идентификатор (имя) последним/вторым аргументом. Эти имена полезны для отладки в development, но не нужны в production. Сейчас имена расставляются вручную, что трудозатратно.

## Решение: Babel-плагин

Плагин будет:

1. **В development** — автоматически добавлять имена функциям на основе имени переменной, в которую присваивается результат
2. **В production** — удалять эти имена (последний строковый аргумент) для уменьшения размера бандла

## Какие функции обрабатываем

### Из `@reatom/core`

- `atom` — 2-й аргумент (имя)
- `computed` — 2-й аргумент (имя) или последний, если есть опции
- `action` — последний аргумент (имя)
- `effect` — последний аргумент (имя)
- `reatomBoolean` — 2-й аргумент (имя)
- `reatomNumber` — 2-й аргумент (имя)
- `reatomString` — 2-й аргумент (имя)
- `reatomArray` — 2-й аргумент (имя)
- `reatomEnum` — 2-й аргумент (имя)
- `reatomRecord` — 2-й аргумент (имя)
- и любые другие `reatom*`, импортированные из `@reatom/core`

### Из `##/utils/state` (внутренняя утилита проекта)

- `factoryComponent` — 2-й аргумент (имя)

## Логика добавления имени (dev)

1. Найти вызов целевой функции из указанных источников импорта
2. Проверить, что имя ещё не передано (если последний аргумент — строка — пропустить)
3. Определить имя переменной:
   - `const X = atom(...)` → имя `'X'`
   - `const X = wrap(action(...))` → имя `'X'` (смотрим сквозь `wrap`)
   - `const X = wrap(action(forkRef(...)))` → имя `'X'` (смотрим сквозь `wrap` и `forkRef`)
   - `const X = action(...) as Type` → имя `'X'` (смотрим сквозь `as`)
4. Вставить имя как строковый литерал:
   - Для `atom`, `computed`, `reatom*`, `factoryComponent` — вторым аргументом
   - Для `action`, `effect` — последним аргументом (могут иметь много аргументов)

## Логика удаления имени (prod)

1. Найти вызов целевой функции из указанных источников импорта
2. Если последний аргумент — строковый литерал, удалить его

## Структура плагина

```
scripts/babel-plugin-reatom-name/
├── src/
│   ├── index.ts              # Основной файл плагина
│   ├── utils.ts              # Вспомогательные функции
│   └── __tests__/
│       └── plugin.test.ts    # Тесты
├── package.json
└── tsconfig.json
```

## Детальная реализация

### Определение источника импорта

```ts
const REATOM_CORE_FUNCTIONS = new Set([
  'atom',
  'computed',
  'action',
  'effect',
  'reatomBoolean',
  'reatomNumber',
  'reatomString',
  'reatomArray',
  'reatomEnum',
  'reatomRecord',
]);

const CUSTOM_FACTORY_FUNCTIONS = new Set(['factoryComponent']);

function getImportSource(calleeName: string, state): string | null {
  const binding = path.scope.getBinding(calleeName);
  if (!binding) return null;

  const importDeclaration = binding.path.findParent((p) =>
    p.isImportDeclaration(),
  );
  if (!importDeclaration) return null;

  return importDeclaration.node.source.value;
}

function isTargetFunction(calleeName: string, importSource: string): boolean {
  if (
    importSource === '@reatom/core' &&
    REATOM_CORE_FUNCTIONS.has(calleeName)
  ) {
    return true;
  }
  if (
    importSource === '##/utils/state' &&
    CUSTOM_FACTORY_FUNCTIONS.has(calleeName)
  ) {
    return true;
  }
  // Для reatom* функций из @reatom/core
  if (importSource === '@reatom/core' && calleeName.startsWith('reatom')) {
    return true;
  }
  return false;
}
```

### Определение имени переменной

```ts
function getVariableName(path): string | null {
  let current = path;

  // Если мы внутри wrap(...), поднимаемся к VariableDeclarator
  const variableDeclarator = current.findParent((p) =>
    p.isVariableDeclarator(),
  );
  if (!variableDeclarator) return null;

  const id = variableDeclarator.node.id;
  if (t.isIdentifier(id)) {
    return id.name;
  }
  return null;
}
```

### Обработка `wrap` и `as`

```ts
function unwrapCallExpression(path): babel.NodePath | null {
  let current = path;

  // Поднимаемся через wrap(...)
  if (
    current.isCallExpression() &&
    t.isIdentifier(current.node.callee) &&
    current.node.callee.name === 'wrap'
  ) {
    const arg = current.node.arguments[0];
    if (t.isCallExpression(arg)) {
      current = arg; // Это action(...)
    }
  }

  // Поднимаемся через TSAsExpression
  if (current.isTSAsExpression()) {
    current = current.get('expression');
  }

  return current;
}
```

### Определение позиции для имени

```ts
function getNamePosition(calleeName: string): 'second' | 'last' {
  if (calleeName === 'action' || calleeName === 'effect') {
    return 'last';
  }
  return 'second';
}
```

## Тестирование

Тесты пишутся на `vitest` с использованием `@babel/core` для трансформации:

```ts
import { describe, it, expect } from 'vitest';
import babel from '@babel/core';

const transform = (code: string, mode: 'add' | 'remove' = 'add') => {
  return babel.transformSync(code, {
    plugins: [
      ['./scripts/babel-plugin-reatom-name/src/index.ts', { mode }],
    ],
    filename: 'test.ts',
    configFile: false,
    babelrc: false,
  })?.code;
};

describe('babel-plugin-reatom-name', () => {
  describe('add mode', () => {
    it('adds name to atom', () => { ... });
    it('adds name to action', () => { ... });
    it('adds name to reatomBoolean', () => { ... });
    it('adds name to factoryComponent', () => { ... });
    it('adds name to effect', () => { ... });
    it('skips if name already exists', () => { ... });
    it('handles wrap(action(...))', () => { ... });
    it('handles action with type assertion', () => { ... });
    it('handles computed with callback', () => { ... });
    it('does not add name to non-reatom functions', () => { ... });
  });

  describe('remove mode', () => {
    it('removes name from atom', () => { ... });
    it('removes name from action', () => { ... });
    it('removes name from factoryComponent', () => { ... });
    it('does not remove non-string last argument', () => { ... });
  });
});
```

## Интеграция в проект

### 1. Создать структуру плагина

```
scripts/babel-plugin-reatom-name/
├── src/
│   ├── index.ts
│   ├── utils.ts
│   └── __tests__/
│       └── plugin.test.ts
├── package.json
└── tsconfig.json
```

### 2. Добавить в `babel.config.js`

```js
const isProduction = process.env.NODE_ENV === 'buildProduction';

module.exports = {
  // ... существующие настройки
  plugins: [
    // ... существующие плагины
    [
      './scripts/babel-plugin-reatom-name/src/index.ts',
      {
        mode: isProduction ? 'remove' : 'add',
      },
    ],
  ],
};
```

Плагин должен быть подключён **после** `@babel/plugin-transform-runtime`, но **до** `babel-plugin-module-resolver` (который только в production).

### 3. Добавить скрипт для тестирования плагина

В `package.json`:

```json
{
  "scripts": {
    "test:plugin": "vitest run scripts/babel-plugin-reatom-name/"
  }
}
```

## Потенциальные сложности и их решение

| Сложность                                     | Решение                                                         |
| --------------------------------------------- | --------------------------------------------------------------- |
| TypeScript `as`-выражения                     | Использовать `isTSAsExpression()` для навигации по AST          |
| `wrap` и `forkRef` обёртки                    | Рекурсивно разворачивать через `wrap` до целевого вызова        |
| Производительность (поиск binding)            | Кешировать результат проверки импорта для каждого файла         |
| `computed` с 3 аргументами (опции)            | Проверять тип последнего аргумента — если не строка, не трогать |
| Неизвестное имя переменной (деструктуризация) | Пропускать, если имя не удалось определить                      |
| Несколько импортов из @reatom/core            | Проверять все импорты, а не только первый                       |
| `factoryComponent` из `##/utils/state`        | Проверять import source на `##/utils/state`                     |

## Критерии готовности

- [x] Плагин добавляет имена для `atom`, `computed`, `action`, `effect`, всех `reatom*`, `factoryComponent` в dev-режиме
- [x] Плагин удаляет имена в prod-режиме
- [x] Обрабатывает `wrap(action(...))` и `action(...) as Type`
- [x] Не трогает функции не из целевых источников импорта
- [x] Не перезаписывает уже существующие имена
- [x] Тесты покрывают основные кейсы
- [x] Интегрирован в `babel.config.js`
