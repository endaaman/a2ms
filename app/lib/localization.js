import qs from 'query-string'
import localization from '../localization.yml'
import { isProd } from '../utils'



const regIsLongString = /^\$/

function erroredString(text) {
  return `@ERRORED_STRING: ${text} @`
}

const ListOfGetText = {
  en: text => (
    regIsLongString.test(text)
      ? localization[text] && localization[text].en || erroredString(text)
      : text
    )
  ,
  ja: text => (
    regIsLongString.test(text)
      ? localization[text] && localization[text].ja || erroredString(text)
      : localization[text] || text
    )
}


const ListOfApplyQuery = {
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


export function getText(code) {
  if (!(code in ListOfGetText)) {
    if (!isProd()) {
      console.warn(`Invalid code provied: `, code)
    }
  }
  return ListOfGetText[code]
}


export function applyQuery(code) {
  if (!(code in ListOfApplyQuery)) {
    if (!isProd()) {
      console.warn(`Invalid code provied: `, code)
    }
  }
  return ListOfApplyQuery[code]
}


export function getField(code) {
  return (item, fieldName)=> {
    const key = fieldName + '_' + code
    if (!isProd()) {
      if (!(key in item)) {
        console.warn(`Tried to get "${key}" of `, item)
      }
    }
    return item[key]
  }
}
