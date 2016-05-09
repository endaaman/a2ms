import axios from 'axios'
import { isOnServer, getApiRoot } from '../utils'

let instance = null

export function configureHttp(getState) {
  instance = axios.create({
    timeout: 10000,
  })
  instance.interceptors.request.use(config => {
    const token = getState().token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    config.headers['If-Modified-Since'] = '0'
    return config
  }, error => {
    return Promise.reject(error)
  })
}

export default function Http() {
  if (instance) {
    return instance
  } else {
    throw new Error('You must configureHttp() before')
  }
}
