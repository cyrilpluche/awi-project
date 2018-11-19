/** REACT */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

/** MATERIAL UI */
import { style } from './Style'
import Grid from "@material-ui/core/Grid/Grid";

/** ICONS */
class WaveIt extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify="center" alignItems="center" className={ classes.fullScreen }>
                <iframe className={ classes.waveScreen } src="https://polytech.wave-it.fr/agenda"/>
            </Grid>
        )
    }
}

WaveIt.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(WaveIt));