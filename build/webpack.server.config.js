const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: 'node',
  // 对 bundle renderer 提供 source map 支持
  devtool: 'none',
  entry: ['./src/entry-server.js'],
  output: {
    // 输出文件
    filename: 'server.bundle.js',
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    // 以上是官方文档说明
    // 这里应该填写可以从node_modules中引入的所有非js格式文件
    // 否则会导致服务端渲染时出现语法错误，已踩坑
    // 一般引入UI框架时可能出现，已修复
    whitelist: [
      /\.(sa|sc|c)ss$/, // 样式文件
      /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 多媒体文件
      /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 图片
      /\.(woff2?|eot|ttf|otf)(\?.*)?$/ // 字体
    ]
  }),
  plugins: [
    // 配置环境变量
    new webpack.DefinePlugin(
      utils.replaceEnvKey({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        // 服务器环境变量
        VUE_ENV: '"server"',
        // 设置动态的config
        VUE_CONFIG: 'require("../config")["server"]'
      })
    )
  ]
})
