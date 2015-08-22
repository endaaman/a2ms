EventEmitter2 = (require 'eventemitter2')
spaseo = require 'spaseo.js'

u = require './util'

ee = new EventEmitter2()
pendings = []




module.exports = (Vue, options)->

    baseResolver =
        append: (promise)->
            pendings.push promise

    resolver = u.extend ee, baseResolver

    Vue.router.on '$pageUpdated', ->
        if pendings.length is 0
            return

        cb = spaseo()

        resolver.emit '$resolving'

        Promise.all pendings
        .then ->
            pendings = []
            resolver.emit '$resolved'
            cb()
        , ->
            pendings = []
            resolver.emit '$rejected'
            cb()

    Vue.resolver = resolver

    Vue.prototype.$resolve = (p)->
        vm = this
        opt = vm.__proto__.constructor.options

        if typeof p isnt 'object'
            throw new Error 'Must provide object to `$resolve()`'
            return

        keyMap = []
        promises = []
        for k, v of p
            vm.$add k
            keyMap.push k
            promises.push v

        vm.$add 'resolved'
        vm.$add 'rejected'

        pending = Promise.all promises
        .then (results)->
            for i, result of results
                if typeof result is 'undefined'
                    e = new Error "You resolve undefined by `#{keyMap[i]}`"
                    console.warn e.stack
                vm.$set 'resolved', true
                vm.$set keyMap[i], result
            if typeof opt.resolved is 'function'
                opt.resolved.call vm
        , (err)->
            vm.$set 'rejected', true
            if typeof opt.rejected is 'function'
                opt.rejected.call vm, err

        pendings.push pending
