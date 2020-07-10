import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import Toggler from './Toggler';

const Navbar = (props) => {
  const { auth, profile } = props;
   //console.log(auth);
  const buttons = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
  
  return (    
    <nav className="navbar navbar-expand-lg fixed-top " id="1">      
      <Link to='/' className="navbar-brand ml-1">s0baka</Link>      
      
      
      <div className="nav ml-auto">
        <ul className="navbar-nav ml-auto mt-1">
          <Toggler className="navbar-nav ml-auto "/>
        </ul>  
        <ul className="navbar-nav">
          <button className="nav navbar-toggler text-light ml-auto " type="button" data-toggle="collapse" 
          data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <img src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png" className="navbar-toggler-icon " alt="small-scrrens menu icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {buttons}
          </div>
        </ul>
      </div>          
    </nav>
  )
};
const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
};

export default connect(mapStateToProps)(Navbar);
