import {
  SET_LOCALE,
  defaultLocale,
} from '../actions/locale'


export default (state = {
  code: defaultLocale,
  ja: defaultLocale === 'ja',
  en: defaultLocale === 'en'
}, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {...state, ...{
        code: action.code,
        ja: action.code === 'ja',
        en: action.code === 'en'
      }}
    default:
      return state
  }
}
