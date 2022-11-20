module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json'
    ]
  },``
  globals: {
    ElementPlus: false
  },
  plugins: [
    'vue'
  ],
  rules: {
    'prefer-const': 2,
    'no-console': 1,
    quotes: [1, 'single'],
    'space-in-parens': [2, 'never'],
    semi: [2, 'always'],
    'semi-spacing': [2, { before: false, after: true }],
    'max-len': [
      1,
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreTemplateLiterals: true
      }
    ],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
};