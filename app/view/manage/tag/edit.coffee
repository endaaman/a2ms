Vue = require 'vue'

Article = require '../../../resource/article'
Category = require '../../../resource/category'
Tag = require '../../../resource/tag'

module.exports = Vue.extend
    template: do require './edit.jade'
    data: ->
        editing: false
    methods:
        performSave: (e)->
            e.preventDefault()
            if @editing
                p = Tag.update id: @tag._id, @tag
            else
                p = Tag.save {}, @tag

            p.then (res)=>
                @$router.go '/manage/tag'
                @$toast '保存しました'
            , =>
                @$toast '入力にエラーがあります'

        performDelete: (e)->
            e.preventDefault()
            if not @editing
                return

            Tag.delete id: @tag._id
            .then (res)=>
                @$router.go '/manage/tag'
                @$toast '削除しました'
            , =>
                @$toast 'エラーが発生しました'


    validator:
        validates:
            slug: (slug)->
                /^[a-z0-9_]+$/.test slug
    created: ->
        id = @$context.params.id
        @editing = !!id
        @$resolve
            tag: do =>
                if @editing
                    Tag.get(id: id).then (res)->
                        res.data
                else
                    name_ja: ''
                    name_en: ''
                    articles: []

    rejected: ->
        @$router.go '/manage/tag'
        @$toast 'タグが見つかりませんでした', period: -1
