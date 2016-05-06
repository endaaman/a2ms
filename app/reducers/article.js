import {
  START_FETCHING_ARTICLELIST,
  RECIEVE_ARTICLELIST,
  DROP_ARTICLELIST,
} from '../actions/article'

import {
  UNLINK_CATEGORY_RELATION
} from '../actions/category'


export default (state = {
  items: [],
  promise: null,
}, action) => {
  switch (action.type) {
    case UNLINK_CATEGORY_RELATION:
      return Object.assign({}, state, {
        items: state.items.map(item => {
          if (item.category === action.id) {
            return Object.assign({}, item, {
              category: null
            })
          } else {
            return item
          }
        })
      })

    case START_FETCHING_ARTICLELIST:
      return Object.assign({}, state, {
        promise: action.promise
      })
    case RECIEVE_ARTICLELIST:
      return Object.assign({}, state, {
        items: action.items,
        promise: null
      })
    case DROP_ARTICLELIST:
      return Object.assign({}, state, {
        items: [],
        promise: null
      })
    default:
      return state
  }
}
