import React, { Component } from 'react';
import Dashboard from './dashboard/Dashboard'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";
import Invitation from "./invitation/Invitation";
import Cards from "./card/Cards";
import Profile from './profile/Profile'
import Navbar from "./layout/navbar/Navbar"
import _helper from '../helpers'
import connect from "react-redux/es/connect/connect";
import _action from "../actions";
import LoaderPage from "./loaderPage/LoaderPage";
import Project from './project/Project'
import { style } from './Style'
import {withStyles} from "@material-ui/core";
import AccountConfirmation from "./signup/accountConfirmation/AccountConfirmation"
import TokenVerification from "./signup/accountConfirmation/TokenVerification"
import PasswordForgotten from "./signin/passwordForgotten/PasswordForgotten"
import SearchResults from "./layout/navbar/searchResults/SearchResults"

class App extends Component {
    constructor (props) {
        super(props)
        this.routesAuthorization = this.routesAuthorization.bind(this);
        this.LoginContainer = this.LoginContainer.bind(this)
        this.LoaderPageContainer = this.LoaderPageContainer.bind(this)
        this.DefaultContainer = this.DefaultContainer.bind(this)

    }

    componentWillMount () {
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
        //return this.DefaultContainer
    }

    LoginContainer = () => {
        const { classes } = this.props;

        return(
            <div className={classes.layout}>
                <Switch>
                    <Route exact path="/login" component={Signin} />
                    <Route exact path="/login/:memberEmail/:token" component={Signin} />
                    <Route exact path="/signup" component={Signup} />
                    <Route path="/invitation/:token" component={Invitation} />
                    <Route exact path="/password-forgotten" component={PasswordForgotten} />
                    <Route exact path="/account-confirmation" component={AccountConfirmation} />
                    <Route path="/account-confirmation/:token" component={TokenVerification} />
                    {/*<Route path="/sign_in_with_github/:token" component={SigninGithub} />*/}
                    <Route path='*' render={() => <Redirect to="/login" />}/>
                </Switch>
            </div>
        )
    }

    LoaderPageContainer = () => {
        const { classes } = this.props;

        return(
            <div className={classes.layout}>
                <Route component={LoaderPage} />
            </div>
        )
    }

    DefaultContainer = () => {
        const { classes } = this.props;
        return(
            <div className={classes.layout}>
                <Navbar/>
                <Switch>
                    <Route path="/home" component={Dashboard}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/results" component={SearchResults}/>

                    <Route path="/project/:id" component={Project}/>
                    <Route path="/card" component={Cards} />
                    <Route path='*' render={() => <Redirect to="/home" />}/>
                </Switch>
            </div>
        )
    }
    // <Route path="/" render={() => <Redirect to="/home" />} />

    render() {
        return (
            <Router history={_helper.History}>
                <Switch>
                    <Route component={this.routesAuthorization()}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(App));
