Vue = require 'vue'
Article = require '../../resource/article'

module.exports = Vue.extend
    template: do require './list.jade'
    data: ->
        articles: []
        tag: null
        cat: null

        lang: @$i18n.current
    computed:
        empty: ->
            @articles.length is 0
    methods:
        applyTitle: ->
            if @$i18n.ja
                title = '記事一覧'
                if @tag
                    title = "タグ「#{@tag.name_ja}」"
                else if @cat
                    title = "カテゴリー「#{@cat.name_ja}」"
            else
                title = 'Articles'
                if @tag
                    title = "Tag(#{@tag.name_en})"
                else if @cat
                    title = "Category(#{@cat.name_en})"

            @$meta
                title: title

    created: ->
        @$on '$resolved', ->
            if t = @$context.query.tag
                @tag = @$parent.getTagById t
            else
                @tag = null

            if c = @$context.query.category
                @cat = @$parent.getCatById c
            else
                @cat = null

            @applyTitle()

    updated: ->
        query = {}
        if t = @$context.query.tag
            query.tag = t
        if c = @$context.query.category
            query.category = c

        @$resolve
            articles: Article.get(query).then (res)->
                res.data
