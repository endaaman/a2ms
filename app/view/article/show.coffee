Vue = require 'vue'
Article = require '../../resource/article'

module.exports =
    inherit: true
    template: do require './show.jade'
    created: ->
        @$resolve
            article: Article.get(id: @$context.params.slug).then (res)->
                res.data
