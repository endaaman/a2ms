import {
  START_FETCHING_CATEGORYLIST,
  RECIEVE_CATEGORYLIST,
  DROP_CATEGORYLIST,
  ADD_CATEGORY,
  SET_CATEGORY,
  DELETE_CATEGORY,
} from '../actions/category'


function sort(cats) {
  cats.sort((a, b)=> {
    if (a.order < b.order) {
      return 1
    }
    if (a.order > b.order) {
      return -1
    }
    if (a.id < b.id) {
      return -1
    }
    if (a.id > b.id) {
      return 1
    }
    return 0
  })
  return cats
}



export default (state = {
  items: [],
  promise: null,
}, action) => {
  switch (action.type) {
    case START_FETCHING_CATEGORYLIST:
      return {...state, ...{
        promise: action.promise,
      }}
    case RECIEVE_CATEGORYLIST:
      return {...state, ...{
        items: sort(action.items),
        promise: null,
      }}
    case DROP_CATEGORYLIST:
      return {...state, ...{
        items: [],
        promise: null,
      }}
    case ADD_CATEGORY:
      return {...state, ...{
        items: sort([...state.items, action.item])
      }}
    case SET_CATEGORY:
      return {...state, ...{
        items: sort(state.items.map((item)=> {
          if (item.id === action.item.id) {
            return action.item
          }
          return item
        }))
      }}
    case DELETE_CATEGORY:
      return {...state, ...{
        items: state.items.filter((item)=> item.id !== action.id )
      }}

    default:
      return state
  }
}
