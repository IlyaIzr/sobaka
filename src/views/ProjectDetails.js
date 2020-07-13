import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ReadDraft from '../components/projects/ReadDraft';

const ProjectDetails = ({ project }) => {

  if (project) {
    return (
      <div className="container my-2 text-light align-items-center">
        <ReadDraft
          title={project.title}
          content={project.content}
          authorFirstName={project.authorFirstName}
          createdAt={project.createdAt}
        />
      </div>
    )
  } else {
    return (
      <div className="">
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Загрузка...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="sr-only">Загрузка...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="sr-only">Загрузка...</span>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails);