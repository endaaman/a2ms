import {
  SHOW_TOAST,
  HIDE_TOAST,
} from '../actions/toast'



export default (state = {
    active: false, 
    message: '',
    canceler: null,
  }, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return Object.assign({}, state, {
        active: true,
        message: action.message,
        canceler: action.canceler,
      })
    case HIDE_TOAST:
      return Object.assign({}, state, {
        active: false,
        message: '',
        canceler: null,
      })
    default:
      return state
  }
}
