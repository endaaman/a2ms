import cookies from 'browser-cookies'
import { isOnServer } from '../utils'

export const SET_TOKEN = Symbol()
export const UNSET_TOKEN = Symbol()

export function setToken(token) {
  if (!isOnServer()) {
    cookies.set('token', token, { expires: 365 })
  }
  return {
    type: SET_TOKEN,
    token
  }
}

export function unsetToken() {
  if (!isOnServer()) {
    cookies.erase('token')
  }
  return {
    type: UNSET_TOKEN,
  }
}
