Vue = require 'vue'
Article = require '../../resource/article'

module.exports =
    inherit: true
    template: do require './show.jade'
    data: ->
        tags: []
        cat: @nullCategory
        article: null
        resolved: false
    created: ->
        @pageUpdated = =>
            @resolved = false
            do @$loader
            Article.get(id: @$context.params.slug).then (res)=>
                a = res.data
                @cat = @getCatFromArticle a
                @tags = @getTagsFromArticle a
                @article = a
                @$loader false
                @resolved = true

        @$router.on '$pageUpdated', @pageUpdated
        do @pageUpdated

    destroyed: ->
        @$router.off '$pageUpdated', @pageUpdated
