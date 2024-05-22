import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,

  rules: {
    'style/brace-style': ['error', '1tbs'],
    'style/jsx-one-expression-per-line': 'off',
  },

  typescript: {
    overrides: {
      'ts/consistent-type-definitions': 'off',
    },
  },
})
