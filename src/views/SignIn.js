import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  constructor(){
    super();
    this.handleChange = this._handleChange.bind(this);
  }
  state = {
    email: '',
    password: ''
  };
  _handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const testo = this.props.signIn(this.state);
    console.log(testo)
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="card col-12 col-sm-10 col-md-8 col-lg-6 text-light rounded my-2 mx-auto pb-3 allblack">
        <form onSubmit={this.handleSubmit}>
          <h5 className="card-title">Войти</h5>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input className="form-control" type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="form-group text-right mt-4 mb-1">
            <button className="btn btn-outline-light btn-sm purple">Подтвердить</button>
            { authError ? <p>{authError}</p> : null }
            {}
          </div>
        </form>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);