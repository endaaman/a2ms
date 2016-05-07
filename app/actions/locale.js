import queryString from 'query-string'
import localization from '../localization.yml'
export const SET_LOCALE = Symbol()

const locals = ['en', 'ja']
export const defaultLocale = 'ja'


export function setLocale(code) {
  code = locals.indexOf(code) > -1
    ? code
    : defaultLocale
  return {
    type: SET_LOCALE,
    code: code,
  }
}
