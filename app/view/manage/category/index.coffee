Vue = require 'vue'
config = require '../../../config'

Category = require '../../../resource/category'

module.exports = Vue.extend
    template: do require './index.jade'
    created: ->
        @$resolve
            cats: Category.get().then (res)->
                res.data
