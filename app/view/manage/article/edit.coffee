Vue = require 'vue'
marked = require 'marked'

env = require '../../../env'

Article = require '../../../resource/article'
Category = require '../../../resource/category'
Tag = require '../../../resource/tag'

module.exports = Vue.extend
    template: do require './edit.jade'
    data: ->
        mode: 'ja'
        modified: false
        editing: false
        catOpts: []

        shownPreviewModal: false
        compiledContent: ''
        title: ''

        shownDeleteModal: false
    computed:
        url: ->
            env.baseUrl + '/article/' + @article.slug
    methods:
        performSave: (e)->
            e.preventDefault()
            if @editing
                p = Article.update id: @article._id, @article
            else
                p = Article.save {}, @article

            p.then (res)=>
                @modified = false
                if @editing
                    @$router.reload()
                else
                    @$router.go '/manage/article'
                @$toast '保存しました'
            , =>
                @$toast '入力にエラーがあります'

        performDelete: ->
            if not @editing
                return

            Article.delete id: @article._id
            .then (res)=>
                @$router.go '/manage/article'
                @$toast '削除しました'
            , =>
                @$toast 'エラーが発生しました'

        confirmDelete: ->
            @shownDeleteModal = true

        preview: ->
            if @mode is 'ja'
                @title = @article.title_ja
                content = @article.content_ja
            else
                @title = @article.title_en
                content = @article.content_en
            @compiledContent = marked content
            @shownPreviewModal = true

    validator:
        validates:
            slug: (slug)->
                /^[a-z0-9_]+$/.test slug
    created: ->
        id = @$context.params.id
        @editing = !!id
        @$resolve
            article: do =>
                if @editing
                    Article.get(id: id).then (res)->
                        res.data
                else
                    slug: ''
                    draft: false
                    title_ja: ''
                    title_en: ''
                    content_ja: ''
                    content_en: ''
                    tags: []
                    category: null

            tags: Tag.get().then (res)->
                res.data
            cats: Category.get().then (res)->
                res.data

        @$on '$pageUpdating', (ctx, next, past, status)=>
            if @modified
                result = window.confirm '未保存の編集内容があります。ページを離れますか？'
                if not result
                    status.next = true
    rejected: ->
        @$router.go '/manage/article'
        @$toast '記事が見つかりませんでした', period: -1

    resolved: ->
        @$watch 'article', ->
            @modified = true
        , deep: true
        @catOpts.push
            value: null
            text: 'その他'
        for cat in @cats
            @catOpts.push
                value: cat._id
                text: cat.name_ja
