Vue = require 'vue'

module.exports = Vue.extend
    data: ->
        user: @$auth.user()
    template: do require './index.jade'
