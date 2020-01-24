const Router = require('koa-router')
const router = new Router()

const render = require('../render')

const isProd = process.env.NODE_ENV !== 'dev'
const middlewares = [
  isProd ? require('../render/prod-render') : require('../render/dev-render')
]

router.get('*', ...middlewares, render)

module.exports = router
