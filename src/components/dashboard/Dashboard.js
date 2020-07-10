import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    const { projects, auth } = this.props;
    if (!auth.uid) return <Redirect to='/create' />
    return (
      <div className="container my-2">
        <ProjectList projects={projects} />
      </div>
    )
  }
};
const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth              //lets us use auth.uid 4 example
  }
};

export default compose(connect(mapStateToProps),
  firestoreConnect((props) => {
      if (!props.auth.uid) return []
      return [
          {collection: 'projects',
          where: [
             ['authorId', '==', props.auth.uid]
          ],
          orderBy: ['createdAt', 'desc']      //here i had to set indexes in firestore for 'createdAt' othervise it would conflict with 'where' call here's description https://dusty.phillips.codes/2018/08/25/react-redux-firebase-with-firestore-tutorial/            
      }
      ]
  }))(Dashboard);