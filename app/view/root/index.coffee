Vue = require 'vue'

module.exports = Vue.extend
    data: ->
        active: @$auth.active()
    template: do require './index.jade'
