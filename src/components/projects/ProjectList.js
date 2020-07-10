import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const ProjectList = ({projects}) => {
  return (
    <div className="card-deck">
      { projects && projects.map(project => {
        return (<div key={project.id}>
          <Link to={'/project/' + project.id}  className="card mb-2 text-dark bg-light">              
            <ProjectSummary project={project} />            
          </Link>
          <div className="w-100 d-lg-none mt-2 "></div>
          </div>
        )
      }) }
    </div>
  )
};

export default ProjectList;