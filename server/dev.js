var ansi2html = require('ansi2html')
var express = require('express')
var cookieParser = require('cookie-parser')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
var u = require('./util')

var port = 8080
var webpackConfig = require('../webpack/config')
webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://localhost:8080`)

var compiler = webpack(webpackConfig)
var server = new webpackDevServer(compiler, webpackConfig.devServer)

var project_base_path = require('path').resolve(__dirname, '..')


global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools'))
.development(true)
.server(project_base_path, function(){
  server.use(cookieParser())

  server.use('*', function(req, res) {
    global.__HOSTNAME__ = req.hostname

    function onError(error) {
      var result = '' + error
      if (error.stack) {
        result = result + error.stack
      }
      console.error(result)
      res.status(500).send(`
        <html>
        <pre>${ansi2html(result)}</pre>
        </html>
      `)
    }

    u.removeDependingModuleCaches(require.resolve('./handler'), function(name) {
      if (/\/node_modules\//.test(name)) {
        return false
      }
      return true
    })
    webpackIsomorphicTools.refresh()
    try {
      var handler = require('./handler').default
      handler(req, res, onError)
    } catch(error) {
      onError(error)
    }
  })

  server.listen(port, function() {
    console.info(`STARTED(port:${port}, mode: development)`)
  })
})
