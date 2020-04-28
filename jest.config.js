module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/types/'],
  testMatch: ['**/*.test.{ts,tsx}'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.stories.tsx'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
