export const SHOW_TOAST = Symbol()
export const HIDE_TOAST = Symbol()

export function showToast(message, period = 3000) {
  return (dispatch, getState)=> {
    let canceler = null
    if (period > 0) {
      canceler = setTimeout(()=> {
        dispatch(hideToast())
      }, period)
    }

    return dispatch({
      type: SHOW_TOAST,
      message: message,
      canceler: canceler
    })
  }
}

export function hideToast() {
  return (dispatch, getState)=> {
    const state = getState().toast
    if (state.canceler) {
      clearTimeout(state.canceler)
    }
    return dispatch({
      type: HIDE_TOAST,
    })
  }
}
