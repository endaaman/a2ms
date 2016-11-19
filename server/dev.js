const ansi2html = require('ansi2html')
const express = require('express')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const u = require('./util')

const port = 8080
const webpackConfig = require('../webpack/config')
webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://localhost:8080`)

const compiler = webpack(webpackConfig)
const server = new webpackDevServer(compiler, webpackConfig.devServer)

const project_base_path = require('path').resolve(__dirname, '..')


global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools'))
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
      console.info('LOADED HANDLER')
      handler(req, res, onError)
    } catch(error) {
      onError(error)
    }
  })

  server.listen(port, function() {
    console.info(`STARTED(port:${port}, mode: development)`)
  })
})
