import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/signup" component={SignUp} /> 
                  <Route path="/login" component={Login} /> 
                </Switch>
              </AuthProvider>
            </Router>
          </div>
        </Container>
    )
  }
}

