import {
  SET_LOCALE,
  defaultLocale,
  defaultGetText,
} from '../actions/locale'


export default (state = {
  code: defaultLocale,
  getText: defaultGetText,
  ja: defaultLocale === 'ja',
  en: defaultLocale === 'en',
  query: defaultLocale === 'en' ? '?en' : ''
}, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return Object.assign({}, state, {
        code: action.code,
        ja: action.code === 'ja',
        en: action.code === 'en',
        query: action.code === 'en' ? '?en' : '',
        getText: action.getText,
      })
    default:
      return state
  }
}
