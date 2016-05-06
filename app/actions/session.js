import cookies from 'browser-cookies'
import Http from '../lib/http'
import { setToken, unsetToken } from './token'
import { dropArticles } from './article'
import { isOnServer, getApiRoot as api  } from '../utils'

export const CREATE_SESSION = Symbol()
export const DELETE_SESSION = Symbol()

export function login(payload) {
  // On server, nothing to do
  if (isOnServer()) {
    console.warn('You tried to login in server context')
    return
  }

  return (dispatch)=> {
    return Http().post(`${api()}/session`, payload)
    .then(res => {
      const { token } = res.data
      dispatch(dropArticles())
      dispatch(setToken(encodeURIComponent(token)))
      dispatch({
        type: CREATE_SESSION,
        user: res.data.user,
      })
    })
  }
}


export function check() {
  return (dispatch, getState)=> {
    if (!getState().token) {
      // obviously not logged in
      return
    }

    // already logged in
    const state = getState().session
    if (state.user) {
      return
    }

    return Http().get(`${api()}/session`, {
    }).then(res => {
      const { user } = res.data
      dispatch({
        type: CREATE_SESSION,
        user
      })
    }, ()=> {
      dispatch(unsetToken())
    })
  }
}



export function logout() {
  return (dispatch, getState)=> {
    dispatch(dropArticles())
    dispatch(unsetToken())
    dispatch({
      type: DELETE_SESSION,
    })
  }
}
