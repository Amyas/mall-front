const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV !== 'dev'
const resolve = file => path.resolve(__dirname, '../', file)

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'none' : 'cheap-module-eval-source-map',
  output: {
    path: resolve('dist'),
    filename: isProd ? '[name].[chunkhash].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
              sassOptions: {
                outputStyle: isProd ? 'compressed' : 'nested'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
