const express = require('express')
const proxy = require('http-proxy');
const cookieParser = require('cookie-parser')
const WebpackIsomorphicTools = require('webpack-isomorphic-tools')

const port = parseInt(process.argv[2]) || 8080
const project_base_path = require('path').resolve(__dirname, '..')
const server = express()

if (process.env.API_HOST) {
  proxy.createProxyServer({
    target:`http://${process.env.API_HOST}:3000`
  }).listen(3000)
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools'))
.server(project_base_path, function(){

  server.use(cookieParser())
  server.use(express.static('dist'))

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
