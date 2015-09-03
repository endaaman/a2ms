Vue = require 'vue'
config = require '../../config'

module.exports = Vue.extend
    template: do require './user.jade'
    data: ->
        you: @$auth.user()
        shownDeleteModal: false
        deletingUser: null
    methods:
        setApproval: (e, id, flag)->
            e.preventDefault()

            m = if flag then @$http.post else @$http.delete
            m = m.bind @$http
            m "#{config.api}/users/#{id}/approval"
            .then =>
                @$router.go '/manage/user', true
                @$toast if flag then '認証しました' else '認証を解除しました'
            , =>
                @$router.go '/manage/user', true
                @$toast 'ok'
        confirmDelete: (user)->
            @shownDeleteModal = true
            @deletingUser = user

        performDelete: (user)->
            @$loader()
            @$http.delete "#{config.api}/users/#{user._id}"
            .then =>
                @$loader false
                @$router.reload()
                @$toast "#{user.username}を削除しました"
            , =>
                @$loader false
                @$toast '削除に失敗しました'

    created: ->
        @$resolve
            users: @$http.get("#{config.api}/users").then (res)->
                res.data
