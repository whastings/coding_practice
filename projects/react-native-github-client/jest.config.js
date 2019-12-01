const expoPreset = require('jest-expo/jest-preset')
const jestPreset = require('@testing-library/react-native/jest-preset')

module.exports = Object.assign(expoPreset, jestPreset, {
  preset: '@testing-library/react-native',
  setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles],
  testMatch: [
    '**/*.test.(js|ts|tsx)'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!react-native)'
  ],
})
