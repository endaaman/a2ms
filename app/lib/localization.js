import qs from 'query-string'
import localization from '../localization.yml'

const regIsLongString = /^\$/

export const getText = {
  en: text => (
    regIsLongString.test(text)
      ? localization[text] && localization[text].en || `@ERRORED_STRING: ${text} @`
      : text
    )
  ,
  ja: text => (
    regIsLongString.test(text)
      ? localization[text] && localization[text].ja || `@ERRORED_STRING: ${text} @`
      : localization[text] || text
    )
}


export const applyQuery = {
  en: href => {
    // force add `?en` query
    const matched = href.match( /(.*)?\?(.*)/)
    if (!matched) {
      return href + '?en'
    } else {
      const base = matched[1]
      const search = matched[2]
      if (!search) {
        return base + '?en'
      }
      const query = qs.parse(search)
      if ('en' in query && query.en === null) {
        return href
      } else {
        query.en = null
        return base + '?' + qs.stringify(query)
      }
    }
  },
  ja: href => {
    // force remove `?en` query
    const matched = href.match( /(.*)?\?(.*)/)
    if (!matched) {
      return href
    } else {
      const base = matched[1]
      const search = matched[2]
      if (!search) {
        return base
      }
      const query = qs.parse(search)
      if ('en' in query) {
        delete query.en
        const s = qs.stringify(query)
        return s ? base + '?' + s : base
      } else {
        return href
      }
    }
  }
}
