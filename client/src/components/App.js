import React, {Component} from 'react';

import Signin from './signin/signin'
import SignUp from './signup/SignUp'
import Dashboard from './dashboard/Dashboard'

import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './layouts/not-found'


export default class extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Signin}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}