Vue = require 'vue'

Tag = require '../../../resource/tag'

module.exports = Vue.extend
    template: do require './index.jade'
    created: ->
        @$resolve
            tags: Tag.get().then (res)->
                res.data
