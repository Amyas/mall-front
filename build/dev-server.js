const MemoryFs = require('memory-fs')
const webpack = require('webpack')
// express中间件转koa中间件工具
const c2k = require('koa-connect')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

// webpack客户端配置中添加模块热重载
clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
clientConfig.entry.unshift('webpack-hot-middleware/client?reload=true')

// 客户端webpack实例
const clientCompiler = webpack(clientConfig)
// 服务端实例
const serverCompiler = webpack(serverConfig)

const devMiddleware = webpackDevMiddleware(clientCompiler, {
  logLevel: 'error'
})

// 为服务器webpack例设置内存文件系统
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

const hotMiddleware = webpackHotMiddleware(clientCompiler)

module.exports = {
  devMiddleware,
  serverCompiler,
  serverConfig,
  clientConfig,
  install(app) {
    // 注册weboack-dev-middle中间件
    app.use(async (ctx, next) => {
      const prevStatus = ctx.res.statusCode
      ctx.res.statusCode = 200
      await c2k(devMiddleware)(ctx, () => {
        ctx.res.statusCode = prevStatus
        return next()
      })
    })
    // 注册热加载中间件
    app.use(c2k(hotMiddleware))
  }
}
