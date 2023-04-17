module.exports = {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-restricted-exports': 'off',
    'react/require-default-props': 'off',
    'no-undefined': 'error',
    'react/no-unstable-nested-components': [
      'error',
      { allowAsProps: true },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@env'],
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        varsIgnorePattern: '^_+$',
      },
    ],
    'no-void': ['error', { allowAsStatement: true }],
    '@typescript-eslint/no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: [
          'camelCase',
          'strictCamelCase',
          'PascalCase',
          'StrictPascalCase',
          'snake_case',
          'UPPER_CASE',
        ],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
        filter: {
          regex: '^(__DEV__)$',
          match: false,
        },
      },
    ],
  },
};
