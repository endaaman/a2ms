config = require '../config'

module.exports = (Vue)->
    listCodes =
        en: true
        ja: true
    validCode = (lang)->
        !!listCodes[lang]

    storageKey = config.i18nKey

    current = null
    defaultLang = 'ja'

    storedLang = localStorage.getItem storageKey
    if validCode storedLang
        current = storedLang
    else
        browserLanguage = window.navigator.userLanguage or \
            window.navigator.language or \
            window.navigator.browserLanguage
        if browserLanguage
            code = browserLanguage.substr 0, 2

        if browserLanguage and validCode code
            current = code
        else
            current = defaultLang
        localStorage.setItem storageKey, current

    if not validCode current
        throw new Error '何かおかしい'

    i18n = {}
    Object.keys(listCodes).forEach (code)->
        Object.defineProperty i18n, code,
            enumerable: true
            get: ->
                current is code

    i18n.update = (code, reload)->
        oldCode = current
        if validCode code
            current = code
        else
            current = defaultLang

        if changed = current isnt oldCode
            localStorage.setItem storageKey, code
            if reload isnt false
                window.location.reload false
        changed

    Object.defineProperty i18n, 'current',
        enumerable: true
        get: ->
            current
        set: (code)->
            i18n.update code, true


    window.i18n = Vue.i18n = Vue.prototype.$i18n = i18n
