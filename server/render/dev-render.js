const path = require('path')
const { template, createRenderer } = require('./general')
const {
  devMiddleware,
  serverCompiler,
  serverConfig,
  clientConfig
} = require('../../build/dev-server')

let renderer
let serverBundle
let clientManifest

let renderReady
const renderReadyPromise = new Promise(resolve => (renderReady = resolve))

const update = () => {
  if (serverBundle && clientManifest) {
    renderer = createRenderer(serverBundle, {
      template,
      clientManifest
    })
    renderReady()
  }
}

// 客户端构建钩子
devMiddleware.waitUntilValid(() => {
  clientManifest = JSON.parse(
    devMiddleware.fileSystem.readFileSync(
      path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json')
    )
  )
  update()
})

// 服务端构建钩子
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  if (stats.hasErrors()) return
  // 设置服务端bundle
  serverBundle = JSON.parse(
    serverCompiler.outputFileSystem.readFileSync(
      path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json'),
      'utf-8'
    )
  )
  update()
})

module.exports = async (ctx, next) => {
  await renderReadyPromise
  ctx.renderer = renderer
  await next()
}
