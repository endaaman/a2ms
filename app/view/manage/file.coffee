Vue = require 'vue'
env = require '../../env'
config = require '../../config'
u = require '../../lib/util'

fileTypeMap =
    '画像': /\.(jpe?g|gif|png|bmp)$/
    'スライド':  /\.ppt?x$/
    'ワードファイル':  /\.doc?x$/


module.exports = Vue.extend
    template: do require './file.jade'
    data: ->
        baseUrl: env.baseUrl

        tmpFiles: null
        shownDeleteModal: false
        shownRenameModal: false
        deletingFilename: ''
        renamingFilename: ''
        newFilename: ''

        imageRegExp: /\.(jpe?g|gif|png|bmp)$/
        embedRegExp: /\.(ppt?x|pdf|docx)$/
    methods:
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

        openDeleteModal: (filename)->
            @shownDeleteModal = true
            @deletingFilename = filename

        performDelete: ->
            @$loader()
            @$http.delete "#{config.api}/files/#{@deletingFilename}"
            .then =>
                @$loader false
                @$router.reload()
                @$toast "#{filename}を削除しました"
            , =>
                @$loader false
                @$toast '削除に失敗しました'

        openRenameModal: (filename)->
            @shownRenameModal = true
            @renamingFilename = filename
            @newFilename = filename

        performRename: (e)->
            e.preventDefault()
            @$http.post "#{config.api}/files/rename",
                filename: @renamingFilename
                new_filename: @newFilename
            .then =>
                @$loader false
                @$router.reload()
                @$toast 'ファイルをリネームしました'
            , =>
                @$loader false
                @$toast 'すでにファイルが存在しないか、不正なファイル名が指定されました。'

        isImage: (filename)->
            @imageRegExp.test filename

        isEmbedable: (filename)->
            @embedRegExp.test filename

        getFileType: (filename)->
            for t, r of fileTypeMap
                if r.test filename
                    return t
            parts = filename.split '.'
            if parts[0] and l = parts.length > 1
                ext = parts[parts.length-1]
                return "#{ext.toUpperCase()}ファイル"

            '拡張子なし'

        mdText: (filename)->
            url = "#{@baseUrl}/files/#{filename}"
            "[#{filename}](#{url})"

        mdThumb: (filename)->
            url = "#{@baseUrl}/files/#{filename}"
            thumbUrl = "/files/#{filename}?dh=300"
            base = "![#{filename}](#{thumbUrl})"
            "[#{base}](#{url})"

        mdRaw: (filename)->
            "![filename](/files/#{filename})"

        mdEmbed: (filename)->
            fileUrl = "#{@baseUrl}/files/#{filename}"
            url = "http://docs.google.com/gview?url=#{fileUrl}&embedded=true"
            "<div class=\"iframe-wrapper\"><iframe src=\"#{url}\" frameborder=\"0\"></iframe></div>"

        onCopied: (e)->
            @$toast 'クリップボードにコピーしました'

    created: ->
        @$resolve
            files: @$http.get("#{config.api}/files").then (res)->
                res.data
