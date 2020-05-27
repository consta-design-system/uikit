module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/types/'],
  testMatch: ['**/*.test.{ts,tsx}'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.stories.tsx'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },
};
