import { describe, it, expect } from 'vitest';
import babel from '@babel/core';
import reatomNamePlugin from '../index';

const transform = (code: string) => {
  const result = babel.transformSync(code, {
    plugins: [[reatomNamePlugin]],
    presets: [['@babel/preset-typescript']],
    filename: 'test.ts',
    configFile: false,
    babelrc: false,
  });
  return result?.code || '';
};

const transformWithConfig = (
  code: string,
  functionConfig: Array<{
    path: string;
    functionName: string;
    argNameIndex: number;
  }>,
) => {
  const result = babel.transformSync(code, {
    plugins: [[reatomNamePlugin, { functionConfig }]],
    presets: [['@babel/preset-typescript']],
    filename: 'test.ts',
    configFile: false,
    babelrc: false,
  });
  return result?.code || '';
};

describe('babel-plugin-reatom-name', () => {
  it('adds name to atom', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const countAtom = atom(0);
    `);
    expect(result).toContain('countAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to computed', () => {
    const result = transform(`
      import { computed } from '@reatom/core';
      const itemsAtom = computed(() => propsAtom().items);
    `);
    expect(result).toContain('itemsAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to action', () => {
    const result = transform(`
      import { action } from '@reatom/core';
      const onClick = action((e) => {});
    `);
    expect(result).toContain('onClick');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to effect', () => {
    const result = transform(`
      import { effect } from '@reatom/core';
      const myEffect = effect(() => {});
    `);
    expect(result).toContain('myEffect');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to reatomBoolean', () => {
    const result = transform(`
      import { reatomBoolean } from '@reatom/core';
      const openAtom = reatomBoolean(false);
    `);
    expect(result).toContain('openAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to reatomNumber', () => {
    const result = transform(`
      import { reatomNumber } from '@reatom/core';
      const countAtom = reatomNumber(0);
    `);
    expect(result).toContain('countAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to reatomString with non-empty initial value', () => {
    const result = transform(`
      import { reatomString } from '@reatom/core';
      const nameAtom = reatomString('initial');
    `);
    expect(result).toContain('nameAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to reatomArray', () => {
    const result = transform(`
      import { reatomArray } from '@reatom/core';
      const itemsAtom = reatomArray([]);
    `);
    expect(result).toContain('itemsAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to reatomEnum', () => {
    const result = transform(`
      import { reatomEnum } from '@reatom/core';
      const statusAtom = reatomEnum(['idle', 'loading']);
    `);
    expect(result).toContain('statusAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to reatomRecord', () => {
    const result = transform(`
      import { reatomRecord } from '@reatom/core';
      const configAtom = reatomRecord({});
    `);
    expect(result).toContain('configAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to factoryComponent with custom config', () => {
    const result = transformWithConfig(
      `
      import { factoryComponent } from '##/utils/state';
      export const SelectPopover = factoryComponent(({ controlElAtom }) => {
        return (props) => null;
      });
    `,
      [
        {
          path: '##/utils/state',
          functionName: 'factoryComponent',
          argNameIndex: 1,
        },
      ],
    );
    expect(result).toContain('SelectPopover');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to rangeAtom from subpath with custom config', () => {
    const result = transformWithConfig(
      `
      import { rangeAtom } from '##/utils/state/rangeAtom';
      const itemsAtom = rangeAtom(countAtom);
    `,
      [
        {
          path: '##/utils/state/rangeAtom',
          functionName: 'rangeAtom',
          argNameIndex: 1,
        },
      ],
    );
    expect(result).toContain('itemsAtom');
    expect(result).toContain('generateAtomName');
  });

  it('adds name to rangeAtom with generic type', () => {
    const result = transformWithConfig(
      `
      import { rangeAtom } from '##/utils/state/rangeAtom';
      const listElementsAtom = rangeAtom<ITEM_ELEMENT | null>(lengthAtom);
    `,
      [
        {
          path: '##/utils/state/rangeAtom',
          functionName: 'rangeAtom',
          argNameIndex: 1,
        },
      ],
    );
    expect(result).toContain('listElementsAtom');
    expect(result).toContain('generateAtomName');
  });

  it('skips if argument already exists at index', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const countAtom = atom(0, 'countAtom');
    `);
    // Имя уже было, не должно продублироваться — должен остаться только один 'countAtom'
    expect(result).toContain("'countAtom'");
    // Проверяем, что нет дублирования
    const matches = result.match(/'countAtom'/g);
    expect(matches).toHaveLength(1);
  });

  it('skips if argument at index is a variable', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const name = 'myAtom';
      const countAtom = atom(0, name);
    `);
    // Если по индексу 1 уже есть аргумент (переменная name) — не добавляем
    expect(result).toContain('atom(0, name)');
    // Не должно быть generateAtomName
    expect(result).not.toContain('generateAtomName');
  });

  it('handles wrap(action(...))', () => {
    const result = transform(`
      import { action, wrap } from '@reatom/core';
      const ref = wrap(action(() => {}));
    `);
    expect(result).toContain('ref');
    expect(result).toContain('generateAtomName');
  });

  it('handles action with type assertion', () => {
    const result = transform(`
      import { action } from '@reatom/core';
      const Enter = action((e) => {}) as unknown as (e: KeyboardEvent) => void;
    `);
    expect(result).toContain('Enter');
    expect(result).toContain('generateAtomName');
  });

  it('does not add name to non-reatom functions', () => {
    const result = transform(`
      import { computed } from 'other-lib';
      const itemsAtom = computed(() => []);
    `);
    // Имя переменной есть в коде, но оно не должно быть добавлено как аргумент
    expect(result).toContain('const itemsAtom = computed(() =>');
    expect(result).not.toContain('generateAtomName');
  });

  it('does not add name to functions not from @reatom/core', () => {
    const result = transform(`
      import { isTouch } from '##/utils/state/isTouch';
      const touchAtom = isTouch();
    `);
    // Имя переменной есть в коде, но оно не должно быть добавлено как аргумент
    expect(result).toContain('const touchAtom = isTouch()');
    expect(result).not.toContain('generateAtomName');
  });

  it('skips computed with multiple args (dep + fn) because index 1 is occupied', () => {
    const result = transform(`
      import { computed } from '@reatom/core';
      const valueAtom = computed(depAtom, (ctx) => ctx.get(depAtom));
    `);
    // По индексу 1 уже есть колбэк — имя не добавляется
    expect(result).not.toContain('generateAtomName');
  });

  it('skips action with multiple args because index 1 is occupied', () => {
    const result = transform(`
      import { action } from '@reatom/core';
      const handleClick = action((e, item) => {}, { someOption: true });
    `);
    // По индексу 1 уже есть объект опций — имя не добавляется
    expect(result).not.toContain('generateAtomName');
  });

  it('adds import { generateAtomName } from ##/utils/state/generateAtomName when needed', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const countAtom = atom(0);
    `);
    // babel может использовать двойные или одинарные кавычки
    expect(result).toContain('generateAtomName');
    expect(result).toContain('##/utils/state/generateAtomName');
    expect(result).toContain('import');
  });

  it('does not duplicate generateAtomName import', () => {
    const result = transform(`
      import { generateAtomName } from '##/utils/state/generateAtomName';
      import { atom } from '@reatom/core';
      const countAtom = atom(0);
    `);
    // generateAtomName уже импортирован — не должно быть дублирования
    const generateAtomNameImports = result.match(
      /import\s*\{[^}]*generateAtomName[^}]*\}\s*from\s*['"]##\/utils\/state\/generateAtomName['"]/g,
    );
    expect(generateAtomNameImports).toHaveLength(1);
  });

  it('skips atom with argNameIndex 0 because index 0 is occupied', () => {
    const result = transformWithConfig(
      `
      import { atom } from '@reatom/core';
      const countAtom = atom(0);
    `,
      [
        {
          path: '@reatom/core',
          functionName: 'atom',
          argNameIndex: 0,
        },
      ],
    );
    // По индексу 0 уже есть 0 — не добавляем
    expect(result).not.toContain('generateAtomName');
  });

  it('skips if argument at index 0 already exists', () => {
    const result = transformWithConfig(
      `
      import { atom } from '@reatom/core';
      const countAtom = atom(0);
    `,
      [
        {
          path: '@reatom/core',
          functionName: 'atom',
          argNameIndex: 0,
        },
      ],
    );
    // По индексу 0 уже есть 0 — не добавляем
    expect(result).not.toContain('generateAtomName');
  });

  // ============================================================
  // Тесты для вызова функции без присваивания переменной
  // ============================================================

  it('uses function name when no variable declaration (atom)', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      atom(0);
    `);
    // Должно использовать имя функции 'atom' вместо имени переменной
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("atom")');
  });

  it('uses function name when no variable declaration (action)', () => {
    const result = transform(`
      import { action } from '@reatom/core';
      action((e) => {});
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("action")');
  });

  it('uses function name when no variable declaration (computed)', () => {
    const result = transform(`
      import { computed } from '@reatom/core';
      computed(() => 0);
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("computed")');
  });

  it('uses function name when no variable declaration (effect)', () => {
    const result = transform(`
      import { effect } from '@reatom/core';
      effect(() => {});
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("effect")');
  });

  it('uses function name when no variable declaration (reatomBoolean)', () => {
    const result = transform(`
      import { reatomBoolean } from '@reatom/core';
      reatomBoolean(false);
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("reatomBoolean")');
  });

  it('uses function name when no variable declaration (reatomNumber)', () => {
    const result = transform(`
      import { reatomNumber } from '@reatom/core';
      reatomNumber(0);
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("reatomNumber")');
  });

  it('uses function name when no variable declaration (reatomString)', () => {
    const result = transform(`
      import { reatomString } from '@reatom/core';
      reatomString('initial');
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("reatomString")');
  });

  it('uses function name when no variable declaration (reatomArray)', () => {
    const result = transform(`
      import { reatomArray } from '@reatom/core';
      reatomArray([]);
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("reatomArray")');
  });

  it('uses function name when no variable declaration (reatomEnum)', () => {
    const result = transform(`
      import { reatomEnum } from '@reatom/core';
      reatomEnum(['idle', 'loading']);
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("reatomEnum")');
  });

  it('uses function name when no variable declaration (reatomRecord)', () => {
    const result = transform(`
      import { reatomRecord } from '@reatom/core';
      reatomRecord({});
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("reatomRecord")');
  });

  it('uses function name with custom config when no variable declaration', () => {
    const result = transformWithConfig(
      `
      import { factoryComponent } from '##/utils/state';
      factoryComponent(({ controlElAtom }) => {
        return (props) => null;
      });
    `,
      [
        {
          path: '##/utils/state',
          functionName: 'factoryComponent',
          argNameIndex: 1,
        },
      ],
    );
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("factoryComponent")');
  });

  it('uses function name with wrap() when no variable declaration', () => {
    const result = transform(`
      import { action, wrap } from '@reatom/core';
      wrap(action(() => {}));
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("action")');
  });

  it('uses function name with type assertion when no variable declaration', () => {
    const result = transform(`
      import { action } from '@reatom/core';
      action((e) => {}) as unknown as (e: KeyboardEvent) => void;
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("action")');
  });

  it('still uses variable name when variable declaration exists', () => {
    // Проверяем, что поведение с переменной не сломалось
    const result = transform(`
      import { atom } from '@reatom/core';
      const countAtom = atom(0);
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("countAtom")');
    // Должен быть вызов generateAtomName("countAtom"), а не generateAtomName("atom")
    expect(result).not.toContain('generateAtomName("atom")');
  });

  // ============================================================
  // Тесты для вызова внутри функции (enclosing function name)
  // ============================================================

  it('adds enclosing function name when atom inside arrow function', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const myFn = () => {
        const state = atom(0);
      };
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("myFn", "state")');
  });

  it('adds enclosing function name when atom inside function declaration', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      function myFn() {
        const state = atom(0);
      }
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("myFn", "state")');
  });

  it('adds enclosing function name when effect inside arrow function', () => {
    const result = transform(`
      import { effect } from '@reatom/core';
      const loadData = () => {
        const dataEffect = effect(() => {});
      };
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("loadData", "dataEffect")');
  });

  it('adds enclosing function name when action inside function declaration', () => {
    const result = transform(`
      import { action } from '@reatom/core';
      function handleSubmit() {
        const submitAction = action((e) => {});
      }
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("handleSubmit", "submitAction")');
  });

  it('adds enclosing function name for nested functions (inner function)', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const outer = () => {
        const inner = () => {
          const state = atom(0);
        };
      };
    `);
    // Должно использовать имя ближайшей enclosing функции — 'inner'
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("inner", "state")');
  });

  it('adds enclosing function name with computed inside arrow function', () => {
    const result = transform(`
      import { computed } from '@reatom/core';
      const useTheme = () => {
        const themeAtom = computed(() => ({}));
      };
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("useTheme", "themeAtom")');
  });

  it('adds enclosing function name with reatomBoolean inside function', () => {
    const result = transform(`
      import { reatomBoolean } from '@reatom/core';
      function createFlags() {
        const openAtom = reatomBoolean(false);
      }
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("createFlags", "openAtom")');
  });

  it('adds enclosing function name with custom config inside arrow function', () => {
    const result = transformWithConfig(
      `
      import { rangeAtom } from '##/utils/state/rangeAtom';
      const usePagination = () => {
        const pageAtom = rangeAtom(countAtom);
      };
    `,
      [
        {
          path: '##/utils/state/rangeAtom',
          functionName: 'rangeAtom',
          argNameIndex: 1,
        },
      ],
    );
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("usePagination", "pageAtom")');
  });

  it('does not add enclosing function name when atom is at top level (no enclosing function)', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const countAtom = atom(0);
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("countAtom")');
    // Не должно быть двух аргументов
    expect(result).not.toContain('generateAtomName("countAtom", "countAtom")');
  });

  it('adds enclosing function name when atom inside function expression', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const myFn = function() {
        const state = atom(0);
      };
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("myFn", "state")');
  });

  it('adds enclosing function name when atom inside wrap inside function', () => {
    const result = transform(`
      import { atom, wrap } from '@reatom/core';
      const myFn = () => {
        const state = wrap(atom(0));
      };
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("myFn", "state")');
  });

  it('adds enclosing function name when atom inside function with type assertion', () => {
    const result = transform(`
      import { atom } from '@reatom/core';
      const myFn = () => {
        const state = atom(0) as unknown as number;
      };
    `);
    expect(result).toContain('generateAtomName');
    expect(result).toContain('generateAtomName("myFn", "state")');
  });
});