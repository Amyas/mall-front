const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const utils = require('./utils')

const isProd = process.env.NODE_ENV !== 'dev'
const resolve = file => path.resolve(__dirname, '../', file)

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  }
]

// 测试环境添加eslint-loader
if (!isProd) {
  rules.push({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  })
}

module.exports = merge(baseWebpackConfig, {
  entry: ['./src/entry-client.js'],
  output: {
    filename: 'static/js/[name].client.bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules
  },
  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin(
      utils.replaceEnvKey({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        // 客户端环境变量
        VUE_ENV: '"client"',
        // 设置动态的config, 由服务端渲染导出
        VUE_CONFIG: 'window.config'
      })
    ),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})
