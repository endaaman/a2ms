Vue = require 'vue'

module.exports = Vue.extend
    data: ->
        active: @$auth.active()
        showHero: true
    template: do require './index.jade'
    created: ->
        @$on '$pageUpdated', (ctx, next)=>
            @showHero = next.data.hero isnt false
