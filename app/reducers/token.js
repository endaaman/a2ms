import {
  SET_TOKEN,
  UNSET_TOKEN
} from '../actions/token'


export default (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.token
    case UNSET_TOKEN:
      return ''
    default:
      return state
  }
}
