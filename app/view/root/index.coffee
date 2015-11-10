Vue = require 'vue'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        active: @$auth.active()
        menuFixed: false

        heroShown: true
        heroNarrow: false
        menuShown: true
        footerShown: true

        items: [
            href: '/'
            text: if @$i18n.ja then 'トップ' else 'TOP'
            icon: 'home'
            regexp: /^\/$/
            userOnly: false
        ,
            href: '/article'
            text:  if @$i18n.ja then '記事' else 'ARTICLES'
            icon: 'book'
            regexp: /^\/article/
            userOnly: false
        ,
            id: 'toggleLangauage'
            text: if @$i18n.ja then 'ENGLISH' else '日本語'
            icon: 'flag-o'
        ,
            href: '/manage'
            text: if @$i18n.ja then '管理' else 'MANAGE'
            icon: 'cog'
            regexp: /^\/manage/
            userOnly: true
        ]
        activeItemIndex: -1

    methods:
        menuClicked: (item)->
            if item.id is 'toggleLangauage'
                if @$i18n.current is 'ja'
                    @$i18n.current = 'en'
                else
                    @$i18n.current = 'ja'

    created: ->
        @scroll = =>
            if not @heroShown
                return
            top = document.documentElement.scrollTop or document.body.scrollTop
            @menuFixed = top > @$$.hero.offsetHeight
        window.addEventListener 'scroll', @scroll

        @$on '$pageUpdated', (ctx, next)=>
            @heroNarrow = next.data.layout?.hero is true
            @heroShown = next.data.layout?.hero isnt false
            @menuShown = next.data.layout?.menu isnt false
            @footerShown = next.data.layout?.footer isnt false
            @scroll()
            if not @heroShown and @menuShown
                @menuFixed = true

            @activeItemIndex = -1
            for i, item of @items
                if item.regexp and item.regexp.test @$context.path
                    @activeItemIndex = i
                    break

    destroyed: ->
        window.removeEventListener 'scroll', @scroll
