import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import combinedReducer from '../reducers/combined'

import routes from '../routes'


export default function(initialState) {
  const store = compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)(combinedReducer, initialState)
  return store
}
