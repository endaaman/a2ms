Vue = require 'vue'
spaseo = require 'spaseo.js'

module.exports = Vue.extend
    data: ->
        user: @$auth.user()
    template: do require './index.jade'
    created: ->
        if not @$auth.active()
            spaseo() 404
