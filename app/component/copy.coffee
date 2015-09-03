ZC = require 'zeroclipboard'

module.exports = (Vue, options)->
    Vue.directive 'copy',
        bind: ->
            @client = new ZC @el
            @emitWrappedEvent = (_ev)=>
                ev = document.createEvent 'HTMLEvents'
                ev.initEvent _ev.type
                Vue.util.extend ev, _ev
                @el.dispatchEvent ev

            @client.on 'ready', @emitWrappedEvent
            @client.on 'aftercopy', @emitWrappedEvent

        update: (value)->
            @el.setAttribute 'data-clipboard-text', value
