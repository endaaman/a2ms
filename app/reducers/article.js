import {
  START_FETCHING_ARTICLELIST,
  RECIEVE_ARTICLELIST,
  DROP_ARTICLELIST,
  ADD_ARTICLE,
  SET_ARTICLE,
  DELETE_ARTICLE,
} from '../actions/article'

import {
  DELETE_CATEGORY
} from '../actions/category'

function sort(files) {
  files.sort((a, b)=> {
    if (a.order < b.order) {
      return 1
    }
    if (a.order > b.order) {
      return -1
    }
    if (a.created_at < b.created_at) {
      return -1
    }
    if (a.created_at > b.created_at) {
      return 1
    }
    return 0
  })
  return files
}


export default (state = {
  items: [],
  promise: null,
}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY:
      return {...state, ...{
        items: state.items.map(item => {
          if (item.category === action.id) {
            return {...item, ...{
              category: null
            }}
          } else {
            return item
          }
        })
      }}

    case START_FETCHING_ARTICLELIST:
      return {...state, ...{
        promise: action.promise
      }}
    case RECIEVE_ARTICLELIST:
      return {...state, ...{
        items: action.items,
        promise: null
      }}
    case DROP_ARTICLELIST:
      return {...state, ...{
        items: [],
        promise: null
      }}

    case ADD_ARTICLE:
      return {...state, ...{
        items: sort([...state.items, action.item])
      }}
    case SET_ARTICLE:
      return {...state, ...{
        items: sort(state.items.map(item => item._id === action.item._id ? action.item : item))
      }}
    case DELETE_ARTICLE:
      return {...state, ...{
        items: state.items.filter(item => item._id !== action.id )
      }}

    default:
      return state
  }
}
