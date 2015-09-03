Vue = require 'vue'

config = require '../../config'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        credentials:
            username: ''
            password: ''
        reenteredPassword: ''
    computed:
        matchPassword: ->
            @credentials.password is @reenteredPassword

    methods:
        performSignup: (e)->
            e.preventDefault()

            @$http.post "#{config.api}/users", @credentials
            .then =>
                @$router.go '/', true
                @$toast 'ユーザー登録申請をしました'
            , =>
                @$toast '入力に不備があります'
