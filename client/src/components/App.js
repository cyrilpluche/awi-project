import React, { Component } from 'react';
import Dashboard from './dashboard/Dashboard'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";
import Card from "./card/Card";
import Profile from './profile/Profile'
import Navbar from "./layout/navbar/Navbar"
import _helper from '../helpers'
import connect from "react-redux/es/connect/connect";
import _action from "../actions";
import LoaderPage from "./loaderPage/LoaderPage";

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
        if (this.props.isLoading) {
            return this.LoaderPageContainer
        }
        if (this.props.isLogged) {
            return this.DefaultContainer
        } else {
            return this.LoginContainer
        }
    }

    LoginContainer = () => (
        <div className="container">
            <Route exact path="/" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/card" component={Card} />
        </div>
    )

    LoaderPageContainer = () => (
        <div className="container">
            <Route path="/" component={LoaderPage} />
        </div>
    )

    DefaultContainer = () => (
        <div className="container">
            <Navbar/>
            <Route exact path="/home" component={Dashboard}/>
            <Route exact path="/account" component={Profile}/>
        </div>
    )
    // <Route path="/" render={() => <Redirect to="/home" />} />

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
    isLogged: state.signin.isLogged,
    isLoading: state.signin.isLoading
})

const mapDispatchToProps = {
    onIsMemberLogged: _action.signinAction.isMemberLogged
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
