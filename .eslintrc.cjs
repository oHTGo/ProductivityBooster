module.exports = {
  env: { browser: true, es6: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import', 'jsx-a11y', 'prettier'],
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'type'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-named-as-default': 'off',
    'max-lines': ['error', 200],
    'no-new-wrappers': 'error',
    radix: 'error',
  },
  globals: { chrome: 'readonly', page: true, browser: true, context: true, puppeteerConfig: true, jestPuppeteer: true },
  ignorePatterns: ['watch.js', 'dist/**'],
};
