import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (    
    <ul className="navbar-nav text-right">
      <li className="nav-item" data-toggle="collapse" 
          data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <NavLink to='/signup' className="nav-link text-secondary">Зарегестрироваться</NavLink>
      </li>      
      <li className="nav-item" data-toggle="collapse" 
          data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <NavLink to='/signin' className="nav-link text-secondary">Войти</NavLink>
      </li>
    </ul>  
  )
};

export default SignedOutLinks;