import React, { Component } from 'react';
import Dashboard from './dashboard/Dashboard'
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from "./signin/Signin";

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
