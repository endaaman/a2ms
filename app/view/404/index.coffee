Vue = require 'vue'
spaseo = require 'spaseo.js'

module.exports = Vue.extend
    template: do require './index.jade'
    ready: ->
        spaseo() 404
