import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = ({ signOut, profile }) => {
  return (
    <ul className="navbar-nav text-right">
      <li className="nav-item " data-toggle="collapse"
        data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><NavLink to='/create' className="nav-link" >Написать</NavLink></li>
      <li className="nav-item"><NavLink to='/create' className="nav-link" onClick={signOut} data-toggle="collapse"
        data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">Выйти</NavLink></li>
      <li className="nav-item ">
        <NavLink to='/' className="nav-link">
          <span className="badge badge-warning font-weight-bold">
            {profile.firstName}
          </span>
        </NavLink>
      </li>
    </ul>
  )
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
