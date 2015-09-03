module.exports = (Vue, options)->
    Vue.directive 'select',
        twoWay: true
        cast: (v)->
            if @el.getAttribute 'number'
                (Number v) or v
            else
                v
        bind: ->
            @handler = (->
                if (idx = @value.indexOf @cast(@el.value)) > -1
                    if not @el.checked
                        @value.splice idx, 1
                else
                    if @el.checked
                        @value.push @cast(@el.value)
                @$set @value
            ).bind this
            @el.addEventListener 'change', @handler

        update: (v)->
            @value = v
            @el.checked = (v.indexOf @cast(@el.value)) > -1

        unbind: ->
            @el.removeEventListener 'change', @handler
