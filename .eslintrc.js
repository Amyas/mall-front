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
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],

  globals: {},

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'never'
      }
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1
      }
    ]
    // 不要开启此项配置，否则会导致格式化出现问题
    // "vue/max-attributes-per-line": ["error", {
    //   "singleline": 1,
    //   "multiline": {
    //     "max": 1,
    //     "allowFirstLine": false
    //   }
    // }]
  }
}
