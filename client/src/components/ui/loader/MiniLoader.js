import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function MiniLoader(props) {
    const { classes, size } = props;
    return (
        <div>
            <CircularProgress className={classes.progress} size={size || 30} />
        </div>
    );
}

MiniLoader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniLoader);