import {
  START_FETCHING_NEWSLIST,
  RECIEVE_NEWSLIST,
  DROP_NEWSLIST,
  ADD_NEWS,
  SET_NEWS,
  DELETE_NEWS,
} from '../actions/news'



function sortByDate(items) {
  items.sort((a, b)=> {
    const aDate = new Date(a.date).getTime()
    const bDate = new Date(b.date).getTime()
    if (aDate < bDate) {
      return 1
    }
    if (aDate > bDate) {
      return -1
    }
    return 0
  })
  return items
}



export default (state = {
  items: [],
  promise: null,
}, action) => {
  switch (action.type) {
    case START_FETCHING_NEWSLIST:
      return Object.assign({}, state, {
        promise: action.promise,
      })
    case RECIEVE_NEWSLIST:
      return Object.assign({}, state, {
        items: action.items,
        promise: null,
      })
    case DROP_NEWSLIST:
      return Object.assign({}, state, {
        items: [],
      })
    case ADD_NEWS:
      return Object.assign({}, state, {
        items: sortByDate([...state.items, action.item])
      })
    case SET_NEWS:
      return Object.assign({}, state, {
        items: sortByDate(state.items.map((item)=> {
          if (item._id === action.item._id) {
            return action.item
          }
          return item
        }))
      })
    case DELETE_NEWS:
      return Object.assign({}, state, {
        items: state.items.filter((item)=> item._id !== action.id )
      })

    default:
      return state
  }
}
