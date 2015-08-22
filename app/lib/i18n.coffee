EventEmitter2 = (require 'eventemitter2')
u = require './util'

module.exports = (Vue)->
    ee = new EventEmitter2()

    i18n = (lang)->
        if lang?
            switch lang
                when 'en'
                    sessionStorage.setItem 'lang', 'en'
                else
                    sessionStorage.setItem 'lang', 'ja'

        l = sessionStorage.getItem 'lang'
        if not l
            sessionStorage.setItem 'lang', 'ja'
            l = 'ja'
        l

    u.extend i18n, ee

    Vue.i18n = i18n
    Vue.prototype.$i18n = i18n
