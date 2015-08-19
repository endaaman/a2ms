Vue = require 'vue'
Article = require '../../resource/article'

module.exports = Vue.extend
    template: do require './edit.jade'
    data: ->
        edit: false

    created: ->
        console.log @$context().params
        # @$resolve
        #     article: Article.get(@$context().params.title)
