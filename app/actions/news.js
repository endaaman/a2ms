import Http from '../lib/http'
import { showLoader, hideLoader } from './loader'
import { getApiRoot as api } from '../utils'

export const START_FETCHING_NEWSLIST = Symbol()
export const RECIEVE_NEWSLIST = Symbol()
export const DROP_NEWSLIST = Symbol()
export const ADD_NEWS = Symbol()
export const SET_NEWS = Symbol()
export const DELETE_NEWS = Symbol()


export function dropNewss() {
  return {
    type: DROP_NEWSLIST
  }
}

export function fetchNewss() {
  return (dispatch)=> {
    const promise = Http().get(`${api()}/newss`)
    .then(res => {
      dispatch(hideLoader())
      dispatch({
        type: RECIEVE_NEWSLIST,
        items: res.data,
      })
      return res.data
    }, error => {
      dispatch(hideLoader())
    })
    dispatch(showLoader())
    dispatch({
      type: START_FETCHING_NEWSLIST,
      promise
    })
    return promise
  }
}


export function getNewss() {
  return (dispatch, getState)=> {
    let state = getState().news
    if (state.promise) {
      return state.promise
    }
    if (state.items.length > 0) {
      return Promise.resolve(state)
    }
    return dispatch(fetchNewss())
  }
}


export function deleteNews(id) {
  return (dispatch, getState)=> {
    dispatch(showLoader())
    return Http().delete(`${api()}/newss/${id}`)
    .then(() => {
      dispatch(hideLoader())
      dispatch({
        type: DELETE_NEWS,
        id: id,
      })
    }, error => {
      dispatch(hideLoader())
      throw error
    })
  }
}


function uploadNews(id, item) {
  return (dispatch, getState)=> {
    dispatch(showLoader())

    const updating = !!id
    return Http().request({
      method: updating ? 'PATCH' : 'POST',
      url:  updating ? `${api()}/newss/${id}` : `${api()}/newss`,
      data: item,
    }).then(res => {
      const item = res.data
      dispatch(hideLoader())
      if (updating) {
        dispatch({
          type: SET_NEWS,
          item: item,
        })
      } else {
        dispatch({
          type: ADD_NEWS,
          item: item,
        })
      }
      return item
    }, error => {
      dispatch(hideLoader())
      throw error
    })
  }
}


export function createNews(item) {
  return uploadNews(null, item)
}

export function updateNews(id, item) {
  return uploadNews(id, item)
}
