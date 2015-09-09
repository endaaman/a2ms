
module.exports = (Vue)->
    if typeof window.callPhantom is 'function'
        return

    Vue.router.on '$pageUpdated', (context, next, past, status)->
        window.ga 'send', 'pageview', context.path
