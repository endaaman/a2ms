
module.exports = (Vue)->
    Vue.router.on '$pageUpdated', (context, next, past, status)->
        window.ga 'send', 'pageview', context.path
