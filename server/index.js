const path = require('path')
const Koa = require('koa')
const router = require('./router')

const app = new Koa()

const resolve = file => path.resolve(__dirname, '../', file)

app.use(require('koa-static')(resolve('dist')))

if (process.env.NODE_ENV === 'dev') {
  require('../build/dev-server').install(app)
}

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server started at http://127.0.0.1:3000')
})
