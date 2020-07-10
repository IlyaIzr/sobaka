export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      // make async call to database binding libras here
      // npm install react-redux-firebase redux-firestore
      const firestore = getFirestore()
      const profileInfo = getState().firebase.profile
      const authorId = getState().firebase.auth.uid

    firestore.collection('projects').add({
      //passing existing props with 3dots and adding new ones
      //...project,                               //same as project.title, project.content etc 
      title: project.title,
      content: project.content,
      authorFirstName: profileInfo.firstName,
      authorLastName: profileInfo.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err)
    })
    }
  }