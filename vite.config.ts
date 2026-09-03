/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-relative-packages
import { vitePluginReatomName } from './scripts/babel-plugin-reatom-name/src/vite-plugin';

export default defineConfig({
  resolve: {
    alias: {
      '##': path.resolve(__dirname, 'src'),
      '\\.css$': path.resolve(__dirname, '__mocks__/styleMock.js'),
      '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        path.resolve(__dirname, '__mocks__/fileMock.js'),
    },
  },
  plugins: [
    vitePluginReatomName({
      functionConfig: [
        {
          path: '##/utils/state',
          functionName: 'factoryComponent',
          argNameIndex: 1,
        },
        {
          path: '##/utils/state',
          functionName: 'rangeAtom',
          argNameIndex: 2,
        },
        {
          path: '##/utils/state',
          functionName: 'forkRef',
          argNameIndex: 1,
        },
        {
          path: '##/utils/state',
          functionName: 'computedSet',
          argNameIndex: 1,
        },
        {
          path: '##/utils/state',
          functionName: 'clickOutsideEffect',
          argNameIndex: 1,
        },
        {
          path: '##/utils/state',
          functionName: 'isTouch',
          argNameIndex: 0,
        },
        {
          path: '##/utils/state',
          functionName: 'onEventEffect',
          argNameIndex: 3,
        },
        {
          path: '##/utils/state',
          functionName: 'keysEffect',
          argNameIndex: 1,
        },
        {
          path: '##/utils/state',
          functionName: 'resizeObservedAtom',
          argNameIndex: 2,
        },
      ],
    }),
    react(),
  ],

  test: {
    css: false,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**.test.{ts,js,tsx}',
      './scripts/**',
    ],
    include: ['**/*unit.{ts,js,tsx}'],
    isolate: true,
    env: {
      NODE_ENV: 'test',
      IS_REACT_ACT_ENVIRONMENT: 'true',
    },
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      screenshotFailures: false,
      instances: [
        {
          name: 'react-chromium',
          browser: 'chromium',
        },
      ],
    },
  },
});
