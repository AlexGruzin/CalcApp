module.exports = {
  roots: ['<rootDir>', '<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/**/index.js',
    '!<rootDir>/src/store/history.js',
    '!<rootDir>/src/pages/**/*.js', // atm pages are outdated and not in the scope
  ],
  modulePaths: ['<rootDir>', '<rootDir>/src/'],
  coverageThreshold: {
    './src/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/constants/*',
    '<rootDir>/src/server/*',
    '<rootDir>/src/sagas/actionTypes/*',
  ],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/src/config/tests.js'],
  testMatch: ['<rootDir>/src/**/*.{spec,test}.js'],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$', '^.+\\.module\\.(css|sass|less)$'],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/config/jest/fileMock.js',
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
