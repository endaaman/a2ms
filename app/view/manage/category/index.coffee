Vue = require 'vue'

Category = require '../../../resource/category'

module.exports = Vue.extend
    template: do require './index.jade'
    created: ->
        @$resolve
            cats: Category.get().then (res)->
                res.data
