Vue = require 'vue'
marked = require 'marked'

Article = require '../../resource/article'

module.exports = Vue.extend
    template: do require './show.jade'
    data: ->
        active: @$auth.active()
        tags: []
        cat: null
        article: null

    computed:
        content: ->
            if @article
                marked @article.content_ja
            else
                ''

    created: ->
        @$on '$resolved', ->
            a = @article
            @cat = @$parent.getCatFromArticle a
            @tags = @$parent.getTagsFromArticle a

    updated: ->
        @$resolve
            article: Article.get(id: @$context.params.slug).then (res)->
                res.data

    resolved: ->
        @$meta
            title: @article.title_ja
