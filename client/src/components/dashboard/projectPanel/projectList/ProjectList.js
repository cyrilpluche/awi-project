import React from 'react'
import {connect} from "react-redux";
import _action from '../../../../actions/index'
import PropTypes from 'prop-types';
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';

class ProjectList extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h3 className={classes.title}>{this.props.title}</h3>
            </div>
        )
    }
}

ProjectList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(ProjectList));