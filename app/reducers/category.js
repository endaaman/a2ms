import {
  START_FETCHING_CATEGORYLIST,
  RECIEVE_CATEGORYLIST,
  DROP_CATEGORYLIST,
  ADD_CATEGORY,
  SET_CATEGORY,
  DELETE_CATEGORY,
} from '../actions/category'



export default (state = {
  items: [],
  promise: null,
}, action) => {
  switch (action.type) {
    case START_FETCHING_CATEGORYLIST:
      return Object.assign({}, state, {
        promise: action.promise,
      })
    case RECIEVE_CATEGORYLIST:
      return Object.assign({}, state, {
        items: action.items,
        promise: null,
      })
    case DROP_CATEGORYLIST:
      return Object.assign({}, state, {
        items: [],
      })
    case ADD_CATEGORY:
      return Object.assign({}, state, {
        items: [...state.items, action.item]
      })
    case SET_CATEGORY:
      return Object.assign({}, state, {
        items: state.items.map((item)=> {
          if (item._id === action.item._id) {
            return action.item
          }
          return item
        })
      })
    case DELETE_CATEGORY:
      return Object.assign({}, state, {
        items: state.items.filter((item)=> item._id !== action.id )
      })

    default:
      return state
  }
}
