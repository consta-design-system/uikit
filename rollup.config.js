import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/components/index.ts',
  output: [
    {
      file: pkg.main,
      name: pkg.name,
      format: 'cjs',
      sourcemap: false,
      compact: true,
    },
    {
      file: pkg.module,
      name: pkg.name,
      format: 'es',
      sourcemap: false,
      compact: true,
    },
  ],
  external: ['react', 'react-dom'],
  treeshake: true,
  plugins: [
    postcss({
      extract: 'dist/style.css',
      namedExport: true,
      minimize: true,
    }),
    typescript({ objectHashIgnoreUnknownHack: true }),
    external(),
    babel({
      extensions,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    json(),
    terser(),
  ],
};
