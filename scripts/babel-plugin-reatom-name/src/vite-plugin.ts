import { transformSync } from '@babel/core';
import type { Plugin } from 'vite';

import reatomNamePlugin from './index';

export interface FunctionConfig {
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

export type VitePluginReatomNameOptions = {
  include?: RegExp[];
  exclude?: RegExp[];
  /** Кастомные конфиги для функций (перезаписывают дефолтные для @reatom/core) */
  functionConfig?: FunctionConfig[];
};

export function vitePluginReatomName(
  options: VitePluginReatomNameOptions = {},
): Plugin {
  const include = options.include ?? [/\/src\//];
  const exclude = options.exclude ?? [/node_modules/, /\.css$/];
  const functionConfig = options.functionConfig;

  return {
    name: 'vite-plugin-reatom-name',
    enforce: 'pre',

    transform(code: string, id: string) {
      // Проверяем, нужно ли обрабатывать файл
      const shouldInclude = include.some((pattern) => pattern.test(id));
      const shouldExclude = exclude.some((pattern) => pattern.test(id));

      if (!shouldInclude || shouldExclude) {
        return null;
      }

      // Формируем опции для babel-плагина
      const pluginOptions = functionConfig
        ? { functionConfig }
        : undefined;

      // Применяем babel с плагином reatom-name
      const result = transformSync(code, {
        plugins: [[reatomNamePlugin, pluginOptions].filter(Boolean)],
        presets: [['@babel/preset-typescript']],
        filename: id,
        configFile: false,
        babelrc: false,
      });

      if (result?.code) {
        return {
          code: result.code,
          map: null,
        };
      }

      return null;
    },
  };
}