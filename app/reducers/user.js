import {
  RECIEVE_USERS,
  DELETE_USER,
  APPROVE_USER,
  REJECT_USER,
} from '../actions/user'


export default (state = [], action) => {
  switch (action.type) {
    case RECIEVE_USERS:
      return [...action.users]
    case DELETE_USER:
      return state.filter(user => user.id !== action.id)
    case APPROVE_USER:
    case REJECT_USER:
      return state.map(user => {
        if (user.id === action.id) {
          return {...user, ...{
            approved: action.type === APPROVE_USER
          }}
        } else {
          return user
        }
      })
    default:
      return state
  }
}
