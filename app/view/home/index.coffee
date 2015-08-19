Vue = require 'vue'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        user: @$auth.user()
        now: new Date
