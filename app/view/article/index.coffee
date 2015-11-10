Vue = require 'vue'
config = require '../../config'

Tag = require '../../resource/tag'
Category = require '../../resource/category'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        baseUrl: config.baseUrl
        otherCategory:
            _id: null
            name_ja: 'その他'
            name_en: 'Other'
            desc_ja: ''
            desc_en: ''

        lang: @$i18n.current
    methods:
        getCatById: (id)->
            if id
                for cat in @cats
                    if cat._id is id
                        return cat
            @otherCategory

        getTagById: (id)->
            for tag in @tags
                if tag._id is id
                    return tag
            null

        getCatFromArticle: (article)->
            @getCatById article.category

        getTagsFromArticle: (article)->
            tags = []
            if Array.isArray article.tags
                for id in article.tags
                    tags.push @getTagById id
            tags

    created: ->
        @$resolve
            tags: Tag.get().then (res)->
                res.data
            cats: Category.get().then (res)=>
                res.data.push @otherCategory
                res.data
