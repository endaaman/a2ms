Vue = require 'vue'
page = require 'page'
request = require 'superagent'
marked = require 'marked'
spaseo = require 'spaseo.js'

config = require '../../config'
meta = require '../../lib/meta'
auth = require '../../lib/auth'
loader = require '../../lib/loader'

module.exports = Vue.extend
    template: do require './show.jade'
    data: ->
        memo: null
        compiledContent: ''
        active: auth.active()
    attached: ->
        loader.show()
        cb = spaseo()
        request.get "#{config.api}/memos/#{@$context.params.title}"
        .end (err, res)=>
            if err
                loader.hide()
                page '/memo'
                return
            @$set 'memo', res.body
            @$set 'compiledContent', marked @memo.content

            matchedImage = @memo.content.match /\!\[.*\]\((.*)\)/

            meta.set
                type: 'article'
                title: @memo.title
                image: if matchedImage and matchedImage[1] then matchedImage[1] else null
                description: @memo.digest

            loader.hide()
            cb()
