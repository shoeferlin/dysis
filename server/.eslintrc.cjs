module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    quotes: ['error', 'single'],
    'import/no-unresolved': 'off',
    'import/extensions': ['error', 'always', { ignorePackages: true }],
  },
};
