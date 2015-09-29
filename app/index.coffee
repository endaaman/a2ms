require './style/index.sass'

require '../ga'
(require './lib/font') 'Source Sans Pro': true

Vue = require 'vue'
Vue.use require 'vue-resource'
Vue.use require 'vue-validator'
# for IE
Vue.http.headers.common['If-Modified-Since'] = 0

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
Vue.use require './lib/responsive'
Vue.use require './component/link'
Vue.use require './component/dateformat'
Vue.use require './component/bytes'
Vue.use require './component/editable'
Vue.use require './component/select'
Vue.use require './component/modal'
Vue.use require './component/copy'

Vue.router.route require './routes'

(require './handler') Vue

app = new Vue
    template: '<div v-view="root"></div>'

app.$mount '#app'

start = ->
    Vue.router.start()

token = require './lib/token'
if token.exists()
    Vue.loader()
    Vue.resolver.append Vue.auth.check().then start, start
else
    Vue.nextTick start
