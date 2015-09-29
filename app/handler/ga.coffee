spaseo = require 'spaseo.js'
config = require '../config'
env = require '../env'

module.exports = (Vue)->
    if env.isLocal or spaseo.isOnPhantom
        return

    window.ga 'create', config.trackingCode, 'auto'

    Vue.router.on '$pageUpdated', (context, next, past, status)->
        window.ga 'send', 'pageview', context.path
        isFirstTime = false
