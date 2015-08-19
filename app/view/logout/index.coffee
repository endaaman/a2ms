Vue = require 'vue'

router = require '../../lib/router'
auth = require '../../lib/auth'
toast = require '../../lib/toast'

module.exports = Vue.extend
    template: do require './index.jade'
    methods:
        performLogout: ->
            @$auth.logout()
            Vue.nextTick =>
                @$router.go '/', true
                @$toast 'ログアウトしました'
