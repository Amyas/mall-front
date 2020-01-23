// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue','prettier'],

  rules: {
    "prettier/prettier": "error",
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'prod' ? 'error' : 'off',
    semi: ['error', 'never'],
    'vue/html-closing-bracket-newline': ['error', {
      'multiline': 'never'
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1
    }]
  }
}
