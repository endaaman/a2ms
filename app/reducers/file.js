import {
  RECIEVE_FILES,
  ADD_FILES,
  DELETE_FILE,
  RENAME_FILE,
} from '../actions/file'


function sortByName(files) {
  files.sort((a, b)=> {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
  return files
}


export default (state = [], action) => {
  switch (action.type) {
    case RECIEVE_FILES:
      return [...action.files]
    case ADD_FILES:
      return sortByName([...state, ...action.files])
    case DELETE_FILE:
      return state.filter(file => file.name !== action.filename)
    case RENAME_FILE:
      return sortByName(state.map(file => {
        if (file.name === action.oldName) {
          return action.newFile
        } else {
          return file
        }
      }))

    default:
      return state
  }
}
