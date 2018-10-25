import React, { Component } from 'react';
import Dashboard from './dashboard/Dashboard'
import {  Router, Route, Switch } from 'react-router-dom'
import Signin from "./signin/Signin";
import _helper from '../helpers'

class App extends Component {
  render() {
    return (
      <Router history={_helper.History}>
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
