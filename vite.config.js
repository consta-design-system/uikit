import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '##': path.resolve(__dirname, 'src'),
      '\\.css$': path.resolve(__dirname, '__mocks__/styleMock.js'),
      '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        path.resolve(__dirname, '__mocks__/fileMock.js'),
    },
  },
  plugins: [react()],

  test: {
    css: false,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**.test.{ts,js,tsx}',
    ],
    include: ['**/*unit.{ts,js,tsx}'],
    isolate: true,
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
