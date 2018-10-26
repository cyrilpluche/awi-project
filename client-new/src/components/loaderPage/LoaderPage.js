import Loader from '../ui/loader/Loader'
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core";
import { style } from "./Style";
import PropTypes from 'prop-types';

class LoaderPage extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="center" className={classes.layout}>
                <Loader />
            </Grid>
        );
    }

}

LoaderPage.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(style)(LoaderPage);