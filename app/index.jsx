import './polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, match, browserHistory, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll';
import { Provider } from 'react-redux'
import cookies from 'browser-cookies'

import routes from './routes'
import configureStore from './store/configure'
import reducer from './reducers/combined'

import { setToken } from './actions/token'
import { setLocale } from './actions/locale'
import { configureHttp } from './lib/http'

import './styles/global.css'

const rootDom = document.getElementById('app')
const initialState = window.__initial_state__ || {}
const store = configureStore(initialState, history)


configureHttp(store.getState)
const token = cookies.get('token')
if (token) {
  store.dispatch(setToken(token))
}

// auto language detection
// if (!store.getState().locale) {
//   const code = navigator.languages
//     ? navigator.languages[0]
//     : (navigator.language || navigator.userLanguage)
//   store.dispatch(setLocale(code))
// }


match({
  routes,
  history: browserHistory,
}, (error, redirectLocation, renderProps) => {
  renderProps.render = applyRouterMiddleware(useScroll())
  render((
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>
  ), rootDom)
})
