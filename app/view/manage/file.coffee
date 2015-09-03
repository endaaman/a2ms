Vue = require 'vue'
config = require '../../config'
u = require '../../lib/util'

module.exports = Vue.extend
    template: do require './file.jade'
    data: ->
        baseUrl: config.baseUrl

        tmpFiles: null
        shownDeleteModal: false
        deletingFilename: ''
        imageRegExp: /\.(jpe?g|gif|png|bmp)$/
    methods:
        fileUrl: (filename)->
            "/files/#{filename}"

        selectFiles: (e)->
            @tmpFiles = e.target.files
        clearFiles: ->
            @tmpFiles = null

        performUpload: ->
            data = new FormData
            for file in @tmpFiles
                data.append file.name, file

            @$loader()
            @$http.post "#{config.api}/files", data
            .then =>
                @$loader false
                @$router.reload()
                @$toast "#{@tmpFiles.length}件のファイルをアップロードしました"
                @clearFiles()
            , =>
                @$loader false
                @$toast 'アップロードに失敗しました'

        confirmDelete: (filename)->
            @shownDeleteModal = true
            @deletingFilename = filename

        performDelete: (filename)->
            @$loader()
            @$http.delete "#{config.api}/files/#{filename}"
            .then =>
                @$loader false
                @$router.reload()
                @$toast "#{filename}を削除しました"
            , =>
                @$loader false
                @$toast '削除に失敗しました'

        isImage: (filename)->
            @imageRegExp.test filename

        mdText: (filename)->
            url = "#{@baseUrl}/files/#{filename}"
            "[#{filename}](#{url})"

        mdThumb: (filename, withThumb)->
            url = "#{@baseUrl}/files/#{filename}"
            thumbUrl = url + '?dh=300'

            base = "![#{filename}](#{thumbUrl})"
            if withThumb then "[#{base}](#{url})" else base

        onCopied: (e)->
            @$toast 'クリップボードにコピーしました'

    created: ->
        @$resolve
            files: @$http.get("#{config.api}/files").then (res)->
                res.data
