Vue = require 'vue'

router = require '../../lib/router'
auth = require '../../lib/auth'
toast = require '../../lib/toast'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        credentials:
            username: ''
            password: ''

    methods:
        performLogin: (e)->
            e.preventDefault()

            @$auth.login @credentials
            .then =>
                @$router.go '/', true
                @$toast 'ログインしました'
            , =>
                @$toast 'ログインに失敗しました'
