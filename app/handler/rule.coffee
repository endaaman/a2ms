

module.exports = (Vue)->
    Vue.router.on '$pageUpdating', (context, next, past, status)->
        if next.data.next? and not Vue.auth.active()
            status.next = next.data.next
            Vue.toast 'You are not authorized.'
