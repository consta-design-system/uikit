module.exports = {
  verbose: true,
  preset: 'ts-jest',
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
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transformIgnorePatterns: [
    // Транспайлим библиотеки на es-модулях в commonjs-модули
    `<rootDir>/node_modules/(?!(@consta)/).+\\.(js|jsx|ts|tsx)`,
  ],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.stories.tsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
