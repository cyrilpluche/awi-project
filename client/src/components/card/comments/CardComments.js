/** REACT */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _action from '../../actions'

/** COMPONENTS */
import ProjectList from './projectPanel/projectList/ProjectList'
import TeamPanel from './teamPanel/TeamPanel'

/** MATERIAL UI */
import { style } from './Style'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Grid from '@material-ui/core/Grid';

/** ICONS */
import ClearIon from '@material-ui/icons/Clear'
import IconButton from "@material-ui/core/IconButton";

class CardComments extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {


    }

    render() {
        const { classes } = this.props;

        return (
            <Grid>

            </Grid>
        )
    }
}

CardComments.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(CardComments));