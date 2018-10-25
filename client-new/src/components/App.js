import React, { Component } from 'react';
import Signin from './signin/Signin'
import Dashboard from './dashboard/Dashboard'
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path="/" component={Signin}/>
            <Route exact path="/home" component={Dashboard}/>
            <Route component={Signin}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
