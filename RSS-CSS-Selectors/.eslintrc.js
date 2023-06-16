module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-var-requires': 'off'
  },
  plugins: [
    '@typescript-eslint'

  ],
  ignorePatterns: [".eslintrc.js"]
}
