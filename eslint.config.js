import tsParser from '@typescript-eslint/parser'

const xssProneApiRules = [
  {
    selector: "MemberExpression[property.name='innerHTML']",
    message: 'innerHTML is XSS-prone. Use textContent or DOM construction helpers.',
  },
  {
    selector: "MemberExpression[property.name='outerHTML']",
    message: 'outerHTML is XSS-prone. Use textContent or DOM construction helpers.',
  },
  {
    selector: "MemberExpression[property.name='insertAdjacentHTML']",
    message: 'insertAdjacentHTML is XSS-prone. Use DOM construction helpers.',
  },
  {
    selector: "MemberExpression[object.name='document'][property.name='write']",
    message: 'document.write is XSS-prone.',
  },
]

export default [
  {
    files: ['app/**/*.ts', 'netlify/**/*.ts', 'dev-server.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-restricted-syntax': ['error', ...xssProneApiRules],
    },
  },
]
