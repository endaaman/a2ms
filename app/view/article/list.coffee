Vue = require 'vue'
Article = require '../../resource/article'

module.exports =
    inherit: true
    template: do require './list.jade'
    data: ->
        tag: null
        cat: null
        articles: []
    computed:
        empty: ->
            @articles.length is 0
    created: ->
        @pageUpdated = =>
            query = {}
            @tag = null
            @cat = null
            if tag = @$context.query.tag
                query.tag = tag
                @tag = @getTagById tag
            if cat = @$context.query.category
                query.category = cat
                @cat = @getCatById cat

            do @$loader
            Article.get(query).then (res)=>
                @articles = res.data
                @$loader false

        @$router.on '$pageUpdated', @pageUpdated
        do @pageUpdated

    destroyed: ->
        @$router.off '$pageUpdated', @pageUpdated
