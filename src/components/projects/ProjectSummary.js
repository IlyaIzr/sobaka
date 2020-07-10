import React from 'react';
import DeletePr from './DeletePr';

const ProjectSummary = ({project}) => {
  let options = {weekday: 'long', hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric'};
  return (    
    <div className="card-body ">
      <DeletePr className="card-link text-right" project={project}/>
      <h4 className="card-title">{project.title} </h4>        
      <p className="card-subtitle mb-2  text-left">{project.createdAt.toDate().toLocaleDateString("ru-RU", options)} 
      {/*project.createdAt.toDate().toLocaleString("en-US", options)*/}</p>      
    </div>
  )
};
export default ProjectSummary;
