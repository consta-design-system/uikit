import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.unit.{ts,js,tsx}'],
    environment: 'node',
  },
  resolve: {
    alias: {
      '##': '/src',
    },
  },
});