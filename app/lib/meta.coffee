config = require '../config'




applyMetaTag = (key, name, content)->
    el = document.querySelector "meta[#{key}=\"#{name}\"]"

    if not content
        if el
            el.parentElement.removeChild el
    else
        if not el
            el  = document.createElement 'meta'
            el.setAttribute key, name
            document.head.appendChild el
        el.setAttribute 'content', content


setTitle = (title)->
    if title
        newTitle = title + ' | ' + config.siteName
    else
        newTitle = config.siteName

    document.title = newTitle
    applyMetaTag 'property', 'og:title', newTitle
    applyMetaTag 'name', 'twitter:title', newTitle

setSiteName = (siteName)->
    applyMetaTag 'property', 'og:site_name', siteName

setType = (_type)->
    applyMetaTag 'property', 'og:type', _type

setUrl = (url)->
    applyMetaTag 'property', 'og:url', url

setImage = (url)->
    applyMetaTag 'property', 'og:image', url
    applyMetaTag 'name', 'twitter:image', url

setDescription = (description)->
    applyMetaTag 'name', 'description', description
    applyMetaTag 'property', 'og:description', description
    applyMetaTag 'name', 'twitter:description', description


setKeywords = (keywords)->
    if Array.isArray keywords
        strKeywords = keywords.join ','
    else
        strKeywords = ''

    applyMetaTag 'name', 'keywords', strKeywords


module.exports = (meta)->
    m = meta or {}
    setType m.type or 'website'
    setSiteName m.site_name or config.siteName
    setTitle m.title
    setUrl m.url or config.baseUrl + location.pathname
    setImage m.image or config.baseUrl + config.defaultImage
    setDescription m.description
    setKeywords m.keywords
