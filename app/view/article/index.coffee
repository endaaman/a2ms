Vue = require 'vue'
marked = require 'marked'
config = require '../../config'

Article = require '../../resource/article'
Tag = require '../../resource/tag'
Category = require '../../resource/category'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        baseUrl: config.baseUrl
    methods:
        getCat: (a)->
            for cat in @cats
                if cat._id is a.category_id
                    return cat
            _id: null
            name_ja: 'その他'
            name_en: 'Other'

        getTags: (a)->
            @tags.filter (t)->
                a.tags.indexOf t._id

        getHtml: (article)->
            marked article.content_ja

    created: ->
        @$resolve
            articles: Article.get(with_content: true).then (res)->
                res.data
            tags: Tag.get().then (res)->
                res.data
            cats: Category.get().then (res)->
                res.data.push
                    _id: null
                    name_ja: 'その他'
                    name_en: 'Other'
                res.data
