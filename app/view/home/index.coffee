Vue = require 'vue'

i18n = require '../../lib/i18n'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        user: @$auth.user()
        now: new Date
