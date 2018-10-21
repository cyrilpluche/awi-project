import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Signup from './containers/sign-up'
import Signin from './containers/sign-in'
import NotFound from './components/not-found'

class Routes extends Component{

    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>            
        )
    }
}

export default Routes