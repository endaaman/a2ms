import {
  CREATE_SESSION,
  DELETE_SESSION
} from '../actions/session'



export default (state = {
  user: null,
}, action) => {
  switch (action.type) {
    case CREATE_SESSION:
      return Object.assign({}, state, {
        user: action.user,
      })
    case DELETE_SESSION:
      return Object.assign({}, state, {
        user: null,
      })
    default:
      return state
  }
}
