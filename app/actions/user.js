import Http from '../lib/http'
import { getApiRoot as api } from '../utils'
import { showLoader, hideLoader } from './loader'

export const RECIEVE_USERS = Symbol()
export const DELETE_USER = Symbol()
export const APPROVE_USER = Symbol()
export const REJECT_USER = Symbol()



export function fetchUsers() {
  return (dispatch)=> {
    dispatch(showLoader())
    return Http().get(`${api()}/users`)
    .then(res => {
      dispatch(hideLoader())
      dispatch({
        type: RECIEVE_USERS,
        users: res.data,
      })
      return res.data
    }, error => {
      dispatch(hideLoader())
    })
  }
}

export function getUsers() {
  return (dispatch, getState)=> {
    const state = getState().users
    if (state.length > 0) {
      return Promise.resolve(state)
    } else {
      return dispatch(fetchUsers())
    }
  }
}


export function deleteUser(id) {
  return (dispatch, getState)=> {
    dispatch(showLoader())
    return Http().delete(`${api()}/users/${id}`)
    .then((res)=> {
      dispatch({
        type: DELETE_USER,
        id: id,
      })
      dispatch(hideLoader())
    }, error => {
      dispatch(hideLoader())
    })
  }
}

function setApprovalUser(id, approved) {
  return (dispatch, getState)=> {
    dispatch(showLoader())
    return Http().request({
      method: approved ? 'POST' : 'DELETE',
      url: `${api()}/users/${id}/approval`
    }).then(res => {
      dispatch({
        type: approved ? APPROVE_USER : REJECT_USER,
        id: id
      })
      dispatch(hideLoader())
    }, error => {
      dispatch(hideLoader())
    })
  }
}

export function approveUser(id) {
  return setApprovalUser(id, true)
}

export function rejectUser(id) {
  return setApprovalUser(id, false)
}
