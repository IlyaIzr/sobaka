const initState = {
  toogler: true
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success', action.project)
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error')
      return state
    default:
      return state
  }
};

export default projectReducer