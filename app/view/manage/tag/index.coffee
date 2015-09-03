Vue = require 'vue'
config = require '../../../config'

module.exports = Vue.extend
    template: do require './index.jade'
    created: ->
        @$resolve
            tags: @$http.get("#{config.api}/tags").then (res)->
                res.data
