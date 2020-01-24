const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, '../../', file)

const createRenderer = (bundle, options) =>
  createBundleRenderer(bundle, {
    runInNewContext: false,
    basedir: resolve('dist'),
    ...options
  })

const template = fs.readFileSync(resolve('src/index.template.html'), 'utf-8')

module.exports = {
  resolve,
  template,
  createRenderer
}
