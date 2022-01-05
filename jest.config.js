module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  collectCoverageFrom: ['<rootDir>/src/app/**/*.{ts,js}', '!<rootDir>/src/environments/*', '!<rootDir>/src/assets/**/*'],
  coverageReporters: ['html'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'js', 'html'],
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/app/$1',
    '@framework/(.*)$': '<rootDir>/src/app/framework/$1',
    '@common/(.*)$': '<rootDir>/src/app/common/$1',
    '@environment/(.*)$': '<rootDir>/src/environments/$1',
  },
  modulePaths: [
    '<rootDir>',
  ],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testMatch: ['<rootDir>/src/app/**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
};
