import queryString from 'query-string'
import localization from '../localization.yml'
export const SET_LOCALE = Symbol()

const locals = ['en', 'ja']
export const defaultLocale = 'ja'

const regIsLongString = /^\$/
const getText = {
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


// !!WIP!!
const makeLocaleHref = {
  en: href => {
    const matched = href.match( /(.*)?\?(.*)/)
    if (matched) {
      if (!matched[2]) {
        return matched[1]
      }
      const base = matched[1]
      const search = '?' + matched[2]
      const q = queryString(search)
      if ('en' in q) {
        return href
      } else {
        q.en = null
        return base + '?' + queryString.stringify(q)
      }
    } else {
      return href + '?en'
    }
  },
  ja: href => href
}



export const defaultGetText = getText.ja

export function setLocale(code) {
  code = locals.indexOf(code) > -1
    ? code
    : defaultLocale
  return {
    type: SET_LOCALE,
    code: code,
    getText: getText[code],
  }
}
