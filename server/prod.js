var express = require('express')
var cookieParser = require('cookie-parser')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')

var port = parseInt(process.argv[2]) || 8080
var project_base_path = require('path').resolve(__dirname, '..')
var server = express()


global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools'))
.server(project_base_path, function(){

  server.use(cookieParser())
  // This handled is called cuz nginx serves forward
  server.use(express.static('build'))

  server.use('*', function(req, res) {
    global.__HOSTNAME__ = req.hostname
    function onError(error) {
      res.status(500).send('Something is wrong')
    }
    var handler = require('./handler').default

    try {
      handler(req, res, onError)
    } catch(error) {
      onError(error)
    }
  })

  server.listen(port, function() {
    console.info(`STARTED(port:${port}, mode: production)`)
  })
})
