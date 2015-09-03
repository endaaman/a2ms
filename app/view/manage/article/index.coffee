Vue = require 'vue'
config = require '../../../config'

Article = require '../../../resource/article'
Category = require '../../../resource/category'
Tag = require '../../../resource/tag'


module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        baseUrl: config.baseUrl
    methods:
        getCat: (a)->
            for cat in @cats
                if cat._id is a.category
                    return cat
            name_ja: 'その他'
            name_en: 'Other'

    created: ->
        @$resolve
            articles: Article.get().then (res)->
                res.data
            tags: Tag.get().then (res)->
                res.data
            cats: Category.get().then (res)->
                res.data
    filters:
        tagId: (tags, ids)->
            r = []
            for tag in tags
                if (ids.indexOf tag._id) > -1
                    r.push tag
            r
