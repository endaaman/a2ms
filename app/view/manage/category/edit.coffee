Vue = require 'vue'
config = require '../../../config'

Category = require '../../../resource/category'

module.exports = Vue.extend
    template: do require './edit.jade'
    data: ->
        editing: false
    methods:
        performSave: (e)->
            e.preventDefault()
            if @editing
                p = Category.update id: @cat._id, @cat
            else
                p = Category.save {}, @cat

            p.then (res)=>
                @$router.go '/manage/category'
                @$toast '保存しました'
            , =>
                @$toast '入力にエラーがあります'

        performDelete: (e)->
            e.preventDefault()
            if not @editing
                return

            Category.delete id: @cat._id
            .then (res)=>
                @$router.go '/manage/category'
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
            cat: do =>
                if @editing
                    Category.get(id: id).then (res)->
                        res.data
                else
                    name_ja: ''
                    name_en: ''
                    desc_ja: ''
                    desc_en: ''
                    articles: []

    rejected: ->
        @$router.go '/manage/category'
        @$toast 'タグが見つかりませんでした', period: -1
