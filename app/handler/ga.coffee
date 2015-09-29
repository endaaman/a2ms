spaseo = require 'spaseo.js'
config = require '../config'
env = require '../env'

isFirstTime = false

module.exports = (Vue)->
    if env.isLocal or not spaseo.isOnPhantom
        return

    window.ga 'create', config.trackingCode, 'auto'

    Vue.router.on '$pageUpdated', (context, next, past, status)->
        if isFirstTime
            window.ga 'send', 'pageview'
        else
            window.ga 'set', 'page', context.path
        isFirstTime = false
