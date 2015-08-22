Vue = require 'vue'
marked = require 'marked'
spaseo = require 'spaseo.js'

config = require '../../config'

Article = require '../../resource/article'

module.exports = Vue.extend
    template: do require './show.jade'
    data: ->
        compiledContent: ''
        active: @$auth.active()
    created: ->
        @$resolve
            article: Article.get(id: @$context.params.title).then (res)->
                if res.data then res.data else null
    resolved: ->
        @compiledContent = marked @article.content_ja

    # attached: ->
    #     loader.show()
    #     cb = spaseo()
    #     request.get "#{config.api}/memos/#{@$context.params.title}"
    #     .end (err, res)=>
    #         if err
    #             loader.hide()
    #             page '/memo'
    #             return
    #         @$set 'memo', res.body
    #         @$set 'compiledContent', marked @memo.content
    #
    #         matchedImage = @memo.content.match /\!\[.*\]\((.*)\)/
    #
    #         meta.set
    #             type: 'article'
    #             title: @memo.title
    #             image: if matchedImage and matchedImage[1] then matchedImage[1] else null
    #             description: @memo.digest
    #
    #         loader.hide()
    #         cb()
