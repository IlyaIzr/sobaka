import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import Dashboard from './views/Dashboard';
import ProjectDetails from './views/ProjectDetails';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import CreateProject from './views/CreateProject';
import Page404 from './views/Page404';
import { connect } from 'react-redux';

const App = ({ auth }) => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {auth.uid ?
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path='/create' component={CreateProject} />
            <Route path="/" component={Page404} />
          </Switch>
          :
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path='/create' component={CreateProject} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path="/" component={Page404} />
          </Switch>
        }
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
};

export default connect(mapStateToProps)(App);
