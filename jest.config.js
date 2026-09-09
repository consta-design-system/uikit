module.exports = {
  verbose: true,
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '##/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/*.test.{ts,tsx}'],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/src/components/.*/__mocks__/.*',
  ],
  transformIgnorePatterns: [
    // Транспайлим библиотеки на es-модулях в commonjs-модули
    `<rootDir>/node_modules/(?!(@consta)/).+\\.(js|jsx|ts|tsx)`,
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.stories.tsx',
    '!**/__stand__/**',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  haste: {
    enableSymlinks: false,
    throwOnModuleCollision: false,
  },
  roots: ['<rootDir>/src'],
  // Дополнительные настройки для решения проблемы дублирования пакетов
  moduleDirectories: ['node_modules', '<rootDir>/node_modules'],
  // Игнорируем дубликаты модулей
  watchPathIgnorePatterns: ['<rootDir>/node_modules/@reatom/core'],
};
