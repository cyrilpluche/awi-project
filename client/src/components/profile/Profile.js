import React from 'react'
import { connect } from 'react-redux'
import Menu from '../ui/menu/Menu'
import {Grid, withStyles} from "@material-ui/core";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import Password from './password/Password'
import Overview from "./overview/Overview";
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import _helper from '../../helpers'
import { style } from './Style'

class Profile extends React.Component {

    render() {

        const links = [
            {label: 'Overview', route: '/profile/overview', icon: <AccountBoxIcon/>},
            {label: 'Change Password', route: '/profile/password', icon: <FingerprintIcon/>}
        ];

        const { classes } = this.props;

        return (
            <Grid container spacing={16} className={classes.body}>
                <Grid item xs={3} >
                    <Menu links={links} history={_helper.History}/>
                </Grid>

                <Grid item xs={9}>
                    <Router history={_helper.History}>
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Profile));