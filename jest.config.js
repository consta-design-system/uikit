module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '##/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/*.test.{ts,tsx}'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transformIgnorePatterns: [
    // Транспайлим библиотеки на es-модулях в commonjs-модули
    `<rootDir>/node_modules/(?!(@consta/icons)/).+\\.(js|jsx|ts|tsx)`,
  ],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.stories.tsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
