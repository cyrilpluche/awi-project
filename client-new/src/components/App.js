import React, { Component } from 'react';
import Dashboard from './dashboard/Dashboard'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";
import Navbar from "./layout/navbar/Navbar"
import _helper from '../helpers'
import connect from "react-redux/es/connect/connect";
import _action from "../actions";

class App extends Component {
    constructor (props) {
        super(props)
        this.routesAuthorization = this.routesAuthorization.bind(this);
    }

    componentDidMount () {
        this.props.onIsMemberLogged()
    }

    /* If the user is logged we choose the default component with all components of the application
     * Else we display only the login component
     */
    routesAuthorization () {
        if (this.props.isLogged) {
            return this.DefaultContainer
        } else {
            return this.LoginContainer
        }
    }

    LoginContainer = () => (
        <div className="container">
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
        </div>
    )

    DefaultContainer = () => (
        <div className="container">
            <Navbar/>
            <Route path="/home" component={Dashboard}/>
        </div>
    )

    render() {
        return (
            <Router history={_helper.History}>
                <Switch>
                    <Route path="/" component={this.routesAuthorization()}/>
                </Switch>
            </Router>
        );
    }

}

const mapStateToProps = (state) => ({
    isLogged: state.signin.isLogged
})

const mapDispatchToProps = {
    onIsMemberLogged: _action.signinAction.isMemberLogged
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
