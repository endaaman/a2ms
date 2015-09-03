Vue = require 'vue'
config = require '../config'

module.exports = Vue.resource "#{config.api}/tags/:id", {},
    update:
        method: 'PATCH'
