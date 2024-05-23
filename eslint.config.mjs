import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,

  rules: {
    'style/brace-style': ['error', '1tbs'],
    'style/jsx-one-expression-per-line': 'off',
    'curly': ['error', 'multi-line'],
  },

  typescript: {
    overrides: {
      'ts/consistent-type-definitions': 'off',
    },
  },
})
