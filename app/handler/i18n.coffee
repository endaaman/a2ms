qs = require 'qs'
u = require '../lib/util'

module.exports = (Vue)->
    Vue.router.on '$pageUpdating', (ctx, next, past, status)->
        if not ctx.init
            return
        q = u.extend {}, ctx.query
        if q.lang
            changed = Vue.i18n.update q.lang, false
            delete q.lang
            search = qs.stringify q
            if search
                next = ctx.pathname + '?'
            else
                next = ctx.pathname
            if changed
                window.location.href = next
            else
                status.next = next
