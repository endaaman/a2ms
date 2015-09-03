Vue = require 'vue'

module.exports = Vue.extend
    data: ->
        active: @$auth.active()
        heroShown: true
        heroNarrow: false
        menuShown: true
        menuFixed: false

        items: [
            href: '/'
            text: 'トップ'
            icon: 'home'
            regexp: /^\/$/
            userOnly: false
        ,
            href: '/article'
            text: '記事'
            icon: 'book'
            regexp: /^\/article/
            userOnly: false
        ,
            href: '/manage'
            text: '管理'
            icon: 'cog'
            regexp: /^\/manage/
            userOnly: true
        ]
        activeItemIndex: -1

        scroll: ->
            if not @heroShown
                return
            top = document.documentElement.scrollTop or document.body.scrollTop
            @menuFixed = top > @$$.hero.offsetHeight

    template: do require './index.jade'

    created: ->
        @scroll = @scroll.bind this
        window.addEventListener 'scroll', @scroll

        @$on '$pageUpdated', (ctx, next)=>
            @heroNarrow = next.data.hero is 'narrow'
            @heroShown = next.data.hero isnt false
            @menuShown = next.data.menu isnt false
            @scroll()
            if not @heroShown and @menuShown
                @menuFixed = true

            @activeItemIndex = -1
            for i, item of @items
                if item.regexp.test @$context.path
                    @activeItemIndex = i
                    break

    destroyed: ->
        window.removeEventListener 'scroll', @scroll
