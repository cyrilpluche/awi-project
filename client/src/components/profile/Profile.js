import React from 'react'
import { connect } from 'react-redux'
import Menu from '../ui/menu/Menu'
import { Grid } from "@material-ui/core";
import {Route, Router, Switch} from "react-router-dom";
import Dashboard from '../dashboard/Dashboard'
import Signin from "../signin/Signin";
import {createBrowserHistory} from "history";
const History = createBrowserHistory();

class Profile extends React.Component {

    render() {

        const links = [
            {label: 'Overview', route: '/overview'},
            {label: 'Change Password', route: '/password'},
            {label: 'Profile parameters', route: 'parameters'}
        ];

        return (
            <Grid container>
                <Grid item xs={3}>
                    <Menu links={links}/>
                    <Router history={History}>
                        <Switch>
                            <Route component={Dashboard} path='/1'/>
                            <Route component={Signin} path='/2'/>
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