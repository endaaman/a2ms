import './polyfill'
import cookies from 'browser-cookies'
import React from 'react'
import { render } from 'react-dom'
import { Router, match, browserHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider } from 'react-redux'
import withScroll from 'scroll-behavior'


import routes from './routes'
import configureStore from './store/configure'
import reducer from './reducers/combined'

import { configureHttp } from './lib/http'
import { setToken } from './actions/token'
import { setLocale } from './actions/locale'

import './styles/global.css'

const rootDom = document.getElementById('app')
const initialState = window.__initial_state__ || {}
const history = withScroll(browserHistory)
const store = configureStore(initialState, history)


configureHttp(store.getState)
const token = cookies.get('token')
if (token) {
  store.dispatch(setToken(token))
}
// if (!store.getState().locale) {
//   const code = navigator.languages
//     ? navigator.languages[0]
//     : (navigator.language || navigator.userLanguage)
//   store.dispatch(setLocale(code))
// }


match({ routes, history }, (error, redirectLocation, renderProps) => {
  render((
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>
  ), rootDom)
})
