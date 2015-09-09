Vue = require 'vue'
marked = require 'marked'
config = require '../../config'

Tag = require '../../resource/tag'
Category = require '../../resource/category'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        baseUrl: config.baseUrl
        view: 'list'
    methods:
        getCatById: (id)->
            for cat in @cats
                if cat._id is id
                    return cat
            _id: null
            name_ja: 'その他'
            name_en: 'Other'
            desc_ja: ''
            desc_en: ''

        getTagById: (id)->
            for tag in @tags
                if tag._id is id
                    return tag
            null

        getHtml: (article)->
            marked article.content_ja

    created: ->
        @$resolve
            tags: Tag.get().then (res)->
                res.data
            cats: Category.get().then (res)->
                res.data.push
                    _id: null
                    name_ja: 'その他'
                    name_en: 'Other'
                res.data

        @$on '$pageUpdated', (ctx)->
            if ctx.params.slug?
                @view = 'show'
            else
                @view = 'list'

    components:
        list: require './list'
        show: require './show'
