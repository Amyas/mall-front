const { resolve, template, createRenderer } = require('./general')

const serverBundle = require(resolve('dist/vue-ssr-server-bundle.json'))
const clientManifest = require(resolve('dist/vue-ssr-client-manifest.json'))

const renderer = createRenderer(serverBundle, {
  template,
  clientManifest
})

module.exports = async (ctx, next) => {
  ctx.renderer = renderer
  await next()
}
