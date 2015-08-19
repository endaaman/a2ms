

module.exports = (Vue)->
    Vue.router.on '$pageUpdating', (context, next, past, status)->
        if next.data.restricted?
            status.next = '/'
            Vue.toast 'You are not authorized.'
