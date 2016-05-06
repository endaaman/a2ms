import Http from '../lib/http'
import { getApiRoot as api } from '../utils'
import { showLoader, hideLoader } from './loader'

export const RECIEVE_FILES = Symbol()
export const DROP_FILES = Symbol()

export const ADD_FILES = Symbol()
export const DELETE_FILE = Symbol()
export const RENAME_FILE = Symbol()


function dropFiles() {
  return {
    type: DROP_FILES
  }
}

export function fetchFiles() {
  return (dispatch)=> {
    dispatch(showLoader())
    return Http().get(`${api()}/files`)
    .then(res => {
      dispatch(hideLoader())
      dispatch({
        type: RECIEVE_FILES,
        files: res.data,
      })
      return res.data
    }, error => {
      dispatch(hideLoader())
    })
  }
}

export function getFiles() {
  return (dispatch, getState)=> {
    const state = getState().files
    if (Object.keys(state).length > 0) {
      return Promise.resolve(state)
    } else {
      return dispatch(fetchFiles())
    }
  }
}


export function deleteFile(filename) {
  return (dispatch, getState)=> {
    dispatch(showLoader())
    return Http().delete(`${api()}/files/${filename}`)
    .then((res)=> {
      dispatch({
        type: DELETE_FILE,
        filename: filename,
      })
      dispatch(hideLoader())
    }, error => {
      dispatch(hideLoader())
      throw error
    })
  }
}

// NOTE: param `files` is <Array> of <File object>
export function uploadFiles(files) {
  return (dispatch, getState)=> {
    dispatch(showLoader())
    const data = new FormData()
    for (let file of files) {
      // NOTE: force lower case
      data.append(file.name.toLowerCase(), file)
    }
    return Http().post(`${api()}/files`, data, {
      timeout: 10 * 60 * 1000  // 10min
    })
    .then((res)=> {
      dispatch({
        type: ADD_FILES,
        files: res.data,
      })
      dispatch(hideLoader())
    }, error => {
      dispatch(hideLoader())
      throw error
    })
  }
}


// NOTE: payload: {oldName: String, newName: String}
export function renameFile(oldName, newName) {
  return (dispatch, getState)=> {
    dispatch(showLoader())
    return Http().post(`${api()}/files/rename`, { oldName, newName })
    .then((res)=> {
      dispatch({
        type: RENAME_FILE,
        oldName: oldName,
        newFile: res.data,
      })
      dispatch(hideLoader())
    }, error => {
      dispatch(hideLoader())
      throw error
    })
  }
}
