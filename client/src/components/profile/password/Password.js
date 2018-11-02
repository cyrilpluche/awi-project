import React from 'react'
import { connect } from 'react-redux'
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import {MuiThemeProvider} from "@material-ui/core/es";
import {Theme} from "../../ui/palette/Palette";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from '@material-ui/icons/Save';
import { style } from './Style'
import {withStyles} from "@material-ui/core";
import Snackbar from "../../ui/snackbar/Snackbar"
import _action from "../../../actions";

class Password extends React.Component {
    constructor (props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.generateTextfields = this.generateTextfields.bind(this)
        this.checkFields = this.checkFields.bind(this)
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
        this.state = {
            labelsForClient: ['Current password', 'New password', 'Confirmation'],
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
            openSnackbar: false,
            updatePasswordMsg: this.props.updatePasswordMsg
        }
    }

    // Submit the member form to update db and store
    submit () {
        if (this.checkFields()) {
            this.setState({
                oldPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
                openSnackbar: true
            })
            this.props.onUpdateMemberPassword({
                memberId: this.props.memberId,
                memberPassword: this.state.oldPassword,
                newMemberPassword: this.state.newPassword
            })
        }
    }

    // Disabled submit button if one field is empty
    checkFields () {
        return (
            this.state.oldPassword !== '' &&
            this.state.newPassword !== '' &&
            this.state.newPasswordConfirmation !== '' &&
            this.state.newPassword === this.state.newPasswordConfirmation
        )
    }

    // Update passwords state with new informations of textfields
    handleChange = name => event => {
        this.setState({ [name]: event.target.value.trim() });
    };

    // Handle the snackbar state
    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openSnackbar: false });
    };

    // Loop that reate textfields
    generateTextfields = () => {
        const { classes } = this.props;

        let attributes = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            newPasswordConfirmation: this.state.newPasswordConfirmation
        }

        let values = Object.values(attributes)
        let keys = Object.keys(attributes)
        var textfields = [];
        let index = 0

        for (let item of values) {
            textfields.push(
                <Grid container justify="center" item key={keys[index]}>
                    <TextField
                        id={keys[index]}
                        label={this.state.labelsForClient[index]}
                        className={classes.textField}
                        value={item}
                        onChange={this.handleChange(keys[index])}
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                </Grid>
            )
            index += 1
        }
        return textfields
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid
                container
                alignItems="center"
                justify="center"
            >
                <Grid item>
                    <MuiThemeProvider theme={Theme.successWarningError}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            className={classes.button}
                            onClick={this.submit}
                        >
                            <SaveIcon className={(classes.leftIcon, classes.iconSmall)} />
                             Change
                        </Button>
                    </MuiThemeProvider>
                </Grid>
                <Grid xs={12} item>
                    <form className={classes.container} noValidate autoComplete="off">
                        {this.generateTextfields()}
                    </form>
                </Grid>

                <Snackbar
                    handleSnackbarClose={this.handleSnackbarClose}
                    open={this.state.openSnackbar}
                    message={this.props.updatePasswordMsg}
                />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    memberId: state.signin.member.memberId,
    updatePasswordMsg: state.profile.updatePasswordMsg
})

const mapDispatchToProps = {
    onUpdateMemberPassword: _action.profileAction.updateMemberPassword
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(Password));