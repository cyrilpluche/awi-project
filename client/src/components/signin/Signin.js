import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
import { style } from './Style'
import logo from '../../public/images/prello-logo-2.png'


// CSS imports
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid/Grid";
import CloudIcon from '@material-ui/icons/Cloud'
import Typography from "@material-ui/core/Typography/Typography";
import _helper from "../../helpers";
import HowToRegIcon from "@material-ui/icons/HowToReg"
import {member} from "../../reducers/Member.reducer";


class Signin extends React.Component {
    constructor (props) {
        super(props)

        this.submit = this.submit.bind(this);

        if (props.invitation) {
            this.state = {
                memberEmail: props.invitation.memberEmail,
                memberPassword: '',
            };
        } else {
            this.state = {
                memberEmail: '',
                memberPassword: '',
            };
        }
        this.signinWithGithub = this.signinWithGithub.bind(this);
    }

    componentDidMount () {
        let params = this.props.location.pathname.split('/')
        let memberEmail = params[2]
        let token = params[3]

        if(token) {
            console.log("email: \n", memberEmail)
            console.log("token: \n", token)
            this.props.onConfirmSigninGithub(memberEmail, token)
        }
        //this.props.onValidateAccountWithToken(token)
        //Method that decrypt the token in server, update the given email else error
        // push to account-validation if ok, push to home else
    }

    submit () {
        let memberEmail = this.state.memberEmail
        let memberPassword = this.state.memberPassword

        if (this.props.invitation) {
            this.props.onLogin(memberEmail, memberPassword, null)
        } else {
            this.props.onLogin(memberEmail, memberPassword, '/home')
        }
    }

    signinWithGithub () {
        this.props.onSigninWithGithub()
    }

    goToForgottenPassword () {
        _helper.History.push('/password-forgotten')
    }

    goToSignUp () {
        _helper.History.push('/signup')
    }

    handleChange (event) {
        var { name, value } = event.target; 
        this.setState({ [name]: value });
    }

    render() {
        const { classes, errorMsg } = this.props;
        return (
            <Grid container alignItems='flex-start' className={classes.layout}>

                <Grid xs={1} sm={3} md={5} item className={classes.leftLayout}>

                </Grid>

                <Grid xs={10} sm={9} md={7} item className={classes.rightLayout}>
                    <Grid container justify="center">

                        <Grid xs={12} item className={classes.xsMarginBottom}>
                            <form>
                                <Grid spacing={16} alignItems='flex-start' container>
                                    <Grid xs={6} sm={4} item>
                                        <TextField
                                            error={!!errorMsg}
                                            required
                                            disabled={this.props.invitation}
                                            className={classes.textfield}
                                            name="memberEmail"
                                            id='email'
                                            label="Email"
                                            margin="normal"
                                            variant="outlined"
                                            type="email"
                                            value={this.state.memberEmail}
                                            fullWidth
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </Grid>
                                    <Grid xs={6} sm={4} item>
                                        <TextField
                                            required
                                            className={classes.textfield}
                                            error={!!errorMsg}
                                            id='password'
                                            name="memberPassword"
                                            label="Password"
                                            margin="normal"
                                            variant="outlined"
                                            type="password"
                                            fullWidth
                                            onChange={this.handleChange.bind(this)}
                                        />
                                        <Button
                                            size="small"
                                            onClick={this.goToForgottenPassword}
                                        >
                                            Forgot password
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={4} item>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            color="primary"
                                            onClick={this.submit}
                                        >
                                            Sign In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>

                        <Grid xs={12} item>
                            <Grid container>
                                <Grid xs={1} sm={2} lg={3} item>
                                </Grid>
                                <Grid xs={11} sm={8} lg={6} item>
                                    <Grid justify='center' container className={classes.xsMarginBottom}>
                                        <Grid item>
                                            <img src={logo} width="70" alt="prello logo"/>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="h4" gutterBottom className={classes.xsMarginBottom}>
                                        Start managing your projects and share them
                                    </Typography>
                                    { !this.props.invitation ? (
                                        <div>
                                            <Typography variant="h6" gutterBottom>
                                                Join Prello today
                                            </Typography>

                                            <Button
                                            variant="outlined"
                                            color="primary"
                                            fullWidth
                                            className={classes.button}
                                            onClick={this.goToSignUp}
                                            >
                                                Create your account
                                                <HowToRegIcon className={classes.rightIcon} />
                                            </Button>

                                            <Button
                                            variant="outlined"
                                            color="inherit"
                                            fullWidth
                                            className={classes.button}
                                            >
                                                Sign In with Github
                                                <CloudIcon className={classes.rightIcon} />
                                            </Button>
                                        </div>
                                    ) : null }

                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        fullWidth
                                        className={classes.button}
                                        onClick={this.signinWithGithub}
                                    >
                                        Sign In with Github
                                        <CloudIcon className={classes.rightIcon} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item>

                        </Grid>
                    </Grid>

                    <label className={classes.errorLabel}>{errorMsg}</label>
                </Grid>
            </Grid>
        )
    }


}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errorMsg: state.signin.msgError
})
const mapDispatchToProps = {
    onLogin : _action.signinAction.signin,
    onSigninWithGithub: _action.signinAction.signinWithGithub,
    onConfirmSigninGithub: _action.signinAction.confirmSigninGithub,

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Signin));