// Rollup plugins
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
// import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
// import visualizer from 'rollup-plugin-visualizer';

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
    // visualizer({ template: 'treemap' }),
    postcss({
      extract: 'dist/style.css',
      use: ['sass'],
      namedExport: true,
      minimize: true,
      modules: {
        camelCase: true,
      },
    }),
    typescript({ objectHashIgnoreUnknownHack: true }),
    external(),
    babel({
      extensions,
      exclude: 'node_modules/**',
    }),
    // resolve(),
    commonjs(),
    json(),
    terser(),
  ],
};
