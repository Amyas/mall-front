const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const koaStatic = require('koa-static')
const path = require('path')

const { createBundleRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync(
  './src/index.html',
  'utf-8'
)
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

app.use(koaStatic(path.resolve(__dirname, '../', '')))

router.get('*', async ctx => {
  const html = await renderer.renderToString({
    title: '商城',
    server: ctx
  })
  ctx.body = html
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080)
