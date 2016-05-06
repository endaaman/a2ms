import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import tokenReducer from './token'
import loaderReducer from './loader'
import toastReducer from './toast'
import localeReducer from './locale'

import sessionReducer from './session'
import fileReducer from './file'
import userReducer from './user'
import newsReducer from './news'
import categoryReducer from './category'
import articleReducer from './article'


export default combineReducers({
  form: formReducer,

  token: tokenReducer,
  loader: loaderReducer,
  toast: toastReducer,
  locale: localeReducer,

  session: sessionReducer,
  files: fileReducer,
  users: userReducer,
  news: newsReducer,
  category: categoryReducer,
  article: articleReducer,
})
