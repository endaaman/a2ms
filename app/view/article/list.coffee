Vue = require 'vue'
Article = require '../../resource/article'

module.exports = Vue.extend
    template: do require './list.jade'
    data: ->
        active: @$auth.active()

    created: ->
        @$resolve
            articles: Article.get().then (res)->
                res.data
