Vue = require 'vue'
config = require '../config'

module.exports = Vue.resource("#{config.api}/articles/:id")
