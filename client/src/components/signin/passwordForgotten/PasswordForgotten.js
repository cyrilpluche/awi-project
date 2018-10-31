import React from 'react'
import { connect } from 'react-redux'
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import _helper from "../../../helpers"
import Grid from "@material-ui/core/Grid/Grid";
import logo from "../../../public/images/prello-logo-2.png";
import Button from "@material-ui/core/Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import _action from '../../../actions'
import Snackbar from "../../ui/snackbar/Snackbar";


class PasswordForgotten extends React.Component {
    constructor (props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
        this.state = {
            memberEmail: '',
            openSnackbar: this.props.isPasswordReset
        }
    }

    goToLogin () {
        this.props.onResetField()
        _helper.History.push('/login')
    }

    submit () {
        this.props.onSendNewPassword(this.state.memberEmail)
        this.setState({
            memberEmail: '',
            openSnackbar: true
        })
    }

    handleChange (event) {
        var { name, value } = event.target;
        this.setState({ [name]: value });
    }

    // Handle the snackbar state
    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openSnackbar: false });
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid justify='center' container className={classes.logo}>
                    <Grid item>
                        <img src={logo} width="100" alt="logo of prello"/>
                    </Grid>
                </Grid>

                <Grid justify='center' container >
                    <Typography variant="h6" gutterBottom>
                        Please, provide the email linked to your account. You will receive a new password.
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <Grid container justify="center">
                        <TextField
                            required
                            id='memberEmail'
                            name="memberEmail"
                            label="Email"
                            margin="normal"
                            value={this.state.memberEmail}
                            fullWidth
                            variant="outlined"
                            type="email"
                            onChange={this.handleChange.bind(this)}
                        />
                    </Grid>
                    <Grid container justify="center" className={classes.marginBottom}>
                        <Button
                            size="large"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.submit}
                        >
                            Send a new password
                        </Button>
                    </Grid>
                    <Grid container justify="center">

                        <Button
                            variant="outlined"
                            fullWidth
                            color="secondary"
                            onClick={this.goToLogin}
                        >
                            Back
                            <CloseIcon className={classes.rightIcon} />
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar
                    handleSnackbarClose={this.handleSnackbarClose}
                    open={this.state.openSnackbar}
                    message={this.props.resetPasswordMsg}
                />
            </Grid>
        )
    }
}

PasswordForgotten.propTypes = {
}

const mapStateToProps = (state) => ({
    resetPasswordMsg: state.signin.resetPasswordMsg,
    isPasswordReset: state.signin.isPasswordReset
})

const mapDispatchToProps = {
    onSendNewPassword: _action.signinAction.sendNewPassword,
    onResetField: _action.signinAction.resetField
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PasswordForgotten));