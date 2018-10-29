import React from 'react'
import { connect } from 'react-redux'
import Menu from '../ui/menu/Menu'
import { Grid } from "@material-ui/core";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import Password from './password/Password'
import Overview from "./overview/Overview";
import {createBrowserHistory} from "history";
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import FingerprintIcon from '@material-ui/icons/Fingerprint'

const History = createBrowserHistory();

class Profile extends React.Component {

    render() {

        const links = [
            {label: 'Overview', route: '/profile/overview', icon: <AccountBoxIcon/>},
            {label: 'Change Password', route: '/profile/password', icon: <FingerprintIcon/>},
            {label: 'Profile parameters', route: '/profile/parameters', icon: this.AccountBox}
        ];

        return (
            <Grid container spacing={16}>
                <Grid item xs={3}>
                    <Menu links={links} history={History}/>
                </Grid>

                <Grid item xs={9}>
                    <Router history={History}>
                        <Switch>
                            <Route component={Overview} exact path='/profile/overview'/>
                            <Route component={Password} exact path='/profile/password'/>
                            <Route component={Overview} exact path='/profile/parameters'/>
                            <Route path='*' render={() => <Redirect to="/profile/overview" />}/>
                        </Switch>
                    </Router>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);