import React, { Component } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import PrivateRoute from './components/PrivateRoute';


export default class App extends Component {
  render() {
    return (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{minHeight: "100vh"}}
        >
          <div className="w-100" style={{maxWidth: "400px"}}>
            <Router>
              <AuthProvider>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                  <Route path="/signup" component={SignUp} /> 
                  <Route path="/login" component={Login} /> 
                  <Route path="/forgot-password" component={ForgotPassword} /> 
                </Switch>
              </AuthProvider>
            </Router>
          </div>
        </Container>
    )
  }
}

