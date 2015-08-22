i18n = require '../lib/i18n'

module.exports = (Vue, options)->
    Vue.directive 'link',
        isLiteral: true
        update: (value)->
            lang = i18n()
            switch lang
                when 'en'
                    @el.href = '/en' + value
                else
                    @el.href = value
