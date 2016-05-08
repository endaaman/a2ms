import Http from '../lib/http'
import { showLoader, hideLoader } from './loader'
import { getApiRoot as api,　isPromise } from '../utils'

export const START_FETCHING_CATEGORYLIST = Symbol()
export const RECIEVE_CATEGORYLIST = Symbol()
export const DROP_CATEGORYLIST = Symbol()

export const ADD_CATEGORY = Symbol()
export const SET_CATEGORY = Symbol()
export const DELETE_CATEGORY = Symbol() // This actions is shared with article


export function dropCategories() {
  return {
    type: DROP_CATEGORYLIST
  }
}

export function fetchCategories() {
  return (dispatch)=> {
    const promise = Http().get(`${api()}/categories`)
    .then(res => {
      dispatch(hideLoader())
      dispatch({
        type: RECIEVE_CATEGORYLIST,
        items: res.data,
      })
      return res.data
    }, error => {
      dispatch(hideLoader())
    })
    dispatch({
      type: START_FETCHING_CATEGORYLIST,
      promise
    })
    dispatch(showLoader())
    return promise
  }
}


export function getCategories() {
  return (dispatch, getState)=> {
    let state = getState().category
    if (isPromise(state.promise)) {
      return state.promise
    }
    if (state.items.length > 0) {
      return Promise.resolve(state)
    }
    return dispatch(fetchCategories())
  }
}


export function deleteCategory(id) {
  return (dispatch, getState)=> {
    dispatch(showLoader())
    return Http().delete(`${api()}/categories/${id}`)
    .then(() => {
      dispatch(hideLoader())
      dispatch({
        type: DELETE_CATEGORY,
        id: id,
      })
    }, error => {
      dispatch(hideLoader())
      throw error
    })
  }
}


function uploadCategory(id, item) {
  return (dispatch, getState)=> {
    dispatch(showLoader())

    // NOTE: This transformation should be done on server side
    const data = {...item}
    if (data.index_article === '') {
      data.index_article = null
    }

    const updating = !!id
    return Http().request({
      method: updating ? 'PATCH' : 'POST',
      url:  updating ? `${api()}/categories/${id}` : `${api()}/categories`,
      data: data,
    }).then(res => {
      const item = res.data
      dispatch(hideLoader())
      if (updating) {
        dispatch({
          type: SET_CATEGORY,
          item: item,
        })
      } else {
        dispatch({
          type: ADD_CATEGORY,
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


export function createCategory(item) {
  return uploadCategory(null, item)
}

export function updateCategory(id, item) {
  return uploadCategory(id, item)
}
