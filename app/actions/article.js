import Http from '../lib/http'
import { showLoader, hideLoader } from './loader'
import { getApiRoot as api, isPromise } from '../utils'

export const START_FETCHING_ARTICLELIST = Symbol()
export const RECIEVE_ARTICLELIST = Symbol()
export const DROP_ARTICLELIST = Symbol()

export const ADD_ARTICLE = Symbol()
export const SET_ARTICLE = Symbol()
export const DELETE_ARTICLE = Symbol()


export function dropArticles() {
  return {
    type: DROP_ARTICLELIST
  }
}

export function fetchArticles() {
  return (dispatch)=> {
    const promise = Http().get(`${api()}/articles`)
    .then(res => {
      dispatch(hideLoader())
      dispatch({
        type: RECIEVE_ARTICLELIST,
        items: res.data,
      })
      return res.data
    }, error => {
      dispatch(hideLoader())
    })
    dispatch({
      type: START_FETCHING_ARTICLELIST,
      promise: promise,
    })
    dispatch(showLoader())
    return promise
  }
}


export function getArticles() {
  return (dispatch, getState)=> {
    let state = getState().article
    if (isPromise(state.promise)) {
      return state.promise
    }
    if (state.items.length > 0) {
      return Promise.resolve(state)
    }
    return dispatch(fetchArticles())
  }
}


export function deleteArticle(id) {
  return (dispatch, getState)=> {
    dispatch(showLoader())
    return Http().delete(`${api()}/articles/${id}`)
    .then(() => {
      dispatch(hideLoader())
      dispatch({
        type: DELETE_ARTICLE,
        id: id,
      })
    }, error => {
      dispatch(hideLoader())
    })
  }
}


function uploadArticle(id, item) {
  return (dispatch, getState)=> {
    dispatch(showLoader())

    // NOTE: This transformation should be done on server side
    const data = {...item}
    if (data.category === '') {
      data.category = null
    }

    const updating = !!id
    return Http().request({
      method: updating ? 'PATCH' : 'POST',
      url:  updating ? `${api()}/articles/${id}` : `${api()}/articles`,
      data: data,
    }).then(res => {
      const item = res.data
      dispatch(hideLoader())
      if (updating) {
        dispatch({
          type: SET_ARTICLE,
          item: item,
        })
      } else {
        dispatch({
          type: ADD_ARTICLE,
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


export function createArticle(item) {
  return uploadArticle(null, item)
}

export function updateArticle(id, item) {
  return uploadArticle(id, item)
}
