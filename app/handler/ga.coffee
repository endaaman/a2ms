spaseo = require 'spaseo.js'
config = require '../config'
env = require '../env'
ga = require '../ga'

isFirstTime = false

module.exports = (Vue)->
    if env.isLocal or not spaseo.isOnPhantom
        return

    ga 'create', config.trackingCode, 'auto'

    Vue.router.on '$pageUpdated', (context, next, past, status)->
        if isFirstTime
            ga 'send', 'pageview'
        else
            ga 'set', 'page', context.path
        isFirstTime = false
