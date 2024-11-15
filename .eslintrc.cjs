module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  settings: {
    react: {
      pragma: 'h',
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:preact/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'preact', 'import'],
  rules: {
    'react/no-danger': 'off',
    'jsx-quotes': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'no-plusplus': 'off',
    'comma-dangle': ['off'],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        vars: 'local'
      }
    ],
    'no-shadow': 'off',
    'implicit-arrow-linebreak': 'off',
    'space-before-blocks': 'error',
    'function-paren-newline': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ],
    'object-curly-newline': 'off',
    'func-call-spacing': 'off',
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'no-spaced-func': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    curly: ['error', 'multi', 'consistent'],
    'no-confusing-arrow': 'off',
    'nonblock-statement-body-position': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    'import/order': [
      'error',
      {
        groups: [['external', 'builtin'], 'internal', ['sibling', 'parent'], 'index'],
        pathGroups: [
          {
            pattern: '@preact/*',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@api',
            group: 'internal'
          },
          {
            pattern: '@components',
            group: 'internal'
          },
          {
            pattern: '@screens/*',
            group: 'internal'
          },
          {
            pattern: '@constants/*',
            group: 'internal'
          },
          {
            pattern: '@hooks/*',
            group: 'internal'
          },
          {
            pattern: '@types',
            group: 'internal'
          },
          {
            pattern: '@utils',
            group: 'internal'
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'preact'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
};
