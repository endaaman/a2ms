Vue = require 'vue'
Article = require '../../resource/article'

module.exports = Vue.extend
    template: do require './edit.jade'
    data: ->
        edit: false

    created: ->
        @$resolve
            article: do =>
                if @$context.params.title
                    Article.get(@$context.params.title).then (res)->
                        res.data
                else
                    slug: ''
                    title_ja: ''
                    title_en: ''
                    content_ja: ''
                    content_en: ''
