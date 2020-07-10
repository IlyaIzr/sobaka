import React, { Component } from 'react';
import firebase from 'firebase/app';

class DeletePr extends Component {
  handleClick(e){
    e.preventDefault();
    firebase.firestore().collection('projects').doc(e.target.id).delete().then(() => {
      console.log("Document successfully deleted!")
    });
  };

  render(){    
    return(
    <button type="button" className="close text-danger" data-toggle="tooltip"
    data-placement="top" title="Удалить раз и навсегда" aria-label="Close" >
        <span aria-hidden="true" onClick={this.handleClick} id={this.props.project.id}>&times;</span>
      </button>
    )
  };
};

export default DeletePr;