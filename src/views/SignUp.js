import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../store/actions/authActions';

const SignUp = ({ signUp, auth, authError }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    signUp(state);
  };

  if (auth.uid) return <Redirect to='/' />
  return (
    <div className="card col-12 col-sm-10 col-md-8 col-lg-6 text-light rounded my-2 mx-auto pb-3 allblack">
      <form onSubmit={handleSubmit}>
        <div className="card-title">Новый аккаунт</div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" type="email" id='email' onChange={handleChange} autoFocus />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input className="form-control" type="password" id='password' onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Имя</label>
          <input className="form-control" type="text" id='firstName' onChange={handleChange} />
          <small className="form-text text-muted">Будет видно в конце документа, когда вы захотите им поделиться</small>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Фамилия</label>
          <input className="form-control form-control-sm" type="text" id='lastName'
            onChange={handleChange} placeholder="кажется, это не обязательно"
          />
        </div>
        <div className="form-group text-right mt-4 mb-1">
          <button className="btn btn-outline-light btn-sm purple">Подтвердить</button>
          {authError ? <p>{authError}</p> : null}
        </div>
      </form>
    </div>
  )
};


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);