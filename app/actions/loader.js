export const SHOW_LOADER = Symbol()
export const HIDE_LOADER = Symbol()

export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  }
}
