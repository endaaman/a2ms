config = require '../config'
token = require './token'
u = require './util'

user = null


setUser = (u)->
    user = u

module.exports = (Vue)->
    auth =
        active: -> user?
        user: (copy)->
            if copy? and copy
                u.extend {}, user,  true
            else
                user

        check: ->
            Vue.http
            .get "#{config.api}/session", (data)->
                setUser data.user
            .error (err)=>
                @silentLogout()
                throw err

        login: (credentials)->
            Vue.http
            .post "#{config.api}/session", credentials, (data)->
                token.set data.token
                setUser data.user
            .error (err)=>
                @silentLogout()
                throw err

        logout: ->
            user = null
            token.clear()


    Vue.auth = auth
    Vue.prototype.$auth = auth
