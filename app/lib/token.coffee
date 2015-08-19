http = (require 'vue').http
config = require '../config'

module.exports =
    set: (t)->
        localStorage.setItem 'token', t
    get: ->
        localStorage.getItem 'token'
    clear: ->
        localStorage.removeItem 'token'
    header: ->
        'Authorization': "Bearer #{@get()}"



token =
    set: (token)->
        localStorage.setItem config.tokenKey, token
        http.headers.common['Authorization'] = 'Bearer '+ token
    get: ->
        (localStorage.getItem config.tokenKey) or ''
    exists: ->
        !!@get()
    clear: ->
        localStorage.removeItem config.tokenKey
        delete http.headers.common['Authorization']
    header: ->
        token = @get()
        if token
            "#{config.authHeaderName}": token
        else
            {}

if token.exists()
    token.set token.get()

module.exports = token
