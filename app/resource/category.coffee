Vue = require 'vue'
config = require '../config'

module.exports = Vue.resource "#{config.api}/categories/:id", {},
    update:
        method: 'PATCH'
