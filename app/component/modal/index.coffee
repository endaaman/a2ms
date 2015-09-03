module.exports = (Vue, options)->

    Vue.component 'modal',
        replace: true
        template: do require './index.jade'
        props: ['shown', 'title']
        methods:
            close: ->
                @shown = false
            block: (e)->
                e.stopPropagation()

        created: ->
            @keydown = ((e)->
                # 27: ESC
                if e.keyCode is 27
                    @close()
            ).bind this

            window.document.addEventListener 'keydown', @keydown

        destroyed: ->
            window.document.removeEventListener 'keydown', @keydown
