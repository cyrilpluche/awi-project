import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class SimpleSnackbar extends React.Component {
    /*  You need to add two methods in parent component
     *
     *  nameOfTheMethod () = {
     *      this.setState({ openSnackbar: true })
     *  }
     *
     *  handleSnackbarClose = (event, reason) => {
     *      if (reason === 'clickaway') {
     *          return;
     *      }
     *      this.setState({ openSnackbar: false });
     *  };
     *
     *  Add this field to the state : openSnackbar: false
     *
     *  Call the component like this :
     *  <Snackbar handleSnackbarClose={this.handleSnackbarClose} open={this.state.openSnackbar} message="myMsg"/>
     */

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.open}
                    autoHideDuration={6000}
                    onClose={this.props.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.props.handleSnackbarClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);