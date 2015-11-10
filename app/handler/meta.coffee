module.exports = (Vue)->
    Vue.router.on '$pageUpdated', (ctx, next, past)->
        Vue.meta next.data.meta
