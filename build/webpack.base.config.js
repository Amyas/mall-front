const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV !== 'dev'
const resolve = file => path.resolve(__dirname, '../', file)

/**
 * 获取样式loader配置
 */
const getStyleLoaders = () => {
  const needSourceMap = !isProd
  return [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: needSourceMap,
        importLoaders: 3
      }
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: needSourceMap }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: needSourceMap,
        outputStyle: isProd ? 'compressed' : 'nested'
      }
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [resolve('src/styles/_entry.scss')]
      }
    }
  ]
}

module.exports = {
  devtool: isProd ? 'none' : 'cheap-module-eval-source-map',
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: 'static/img/[name].[hash:7].[ext]',
          publicPath: '/dist/'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [{ use: getStyleLoaders() }]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
