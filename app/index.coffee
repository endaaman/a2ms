require './style/index.sass'

(require './lib/font') 'Source Sans Pro': true

Vue = require 'vue'
Vue.use require 'vue-resource'
Vue.use require 'vue-validator'

spaseo = require 'spaseo.js'
spaseo.wrap (cb)->
    Vue.nextTick ->
        cb()

Vue.use require './lib/router'
Vue.use require './lib/auth'
Vue.use require './lib/loader'
Vue.use require './lib/toast'
Vue.use require './lib/resolver'
Vue.use require './lib/meta'
Vue.use require './component/link'
Vue.use require './component/dateformat'
Vue.use require './component/editable'

Vue.router.route require './routes'

(require './handler') Vue

app = new Vue
    el: '#app'
    template: '<div v-view="root"></div>'

start = ->
    Vue.router.start()

token = require './lib/token'
if token.exists()
    Vue.loader()
    Vue.resolver.append Vue.auth.check().then start, start
else
    Vue.nextTick start
