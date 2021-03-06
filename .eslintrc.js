module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-import'],
  rules: {
    'no-param-reassign': 'error',
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'src/**',
            group: 'external',
            position: 'after'
          }
        ]
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: '.'
      }
    }
  }
};
