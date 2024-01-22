import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['.'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'postgres',
    'coverage',
    './src/configs',
    './src/character/interfaces',
    './src/user/interfaces',
    './src/user-favorite-character/interfaces',
    './src/common/interfaces',
    'dist',
    '.eslintrc.js',
    'jest.config.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/setupTests.ts'],
};

export default config;
