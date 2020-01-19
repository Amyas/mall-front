const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const envPath = `./${process.env.NODE_ENV}.config`

const baseConfig = require('./base.config')
const envConfig = fs.existsSync(envPath + '.js') ? require(envPath) : {}

const base = _.merge({}, baseConfig.base, envConfig.base)
const client = _.merge({}, baseConfig.client, envConfig.client)
const server = _.merge({}, baseConfig.server, envConfig.client)

module.exports = {
  base,
  client,
  server
}
