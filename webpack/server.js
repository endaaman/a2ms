var HtmlWebpackPlugin = require('html-webpack-plugin')

var webpackConfig = require('./config')

webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: './app/index.html',
    inject: 'body'
  })
)

module.exports = webpackConfig
