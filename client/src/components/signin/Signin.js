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


class Signin extends React.Component {
    constructor (props) {
        super(props)

        this.submit = this.submit.bind(this);

        this.state = {
            memberEmail: '',
            memberPassword: '',
        };

        
    }

    submit () {
        let memberEmail = this.state.memberEmail
        let memberPassword = this.state.memberPassword
        this.props.onLogin(memberEmail, memberPassword)
    }

    handleChange (event) {
        var { name, value } = event.target; 
        this.setState({ [name]: value });
    }

    render() {
        const { classes, errorMsg } = this.props;
        return (
            <Grid container alignItems='center' className={classes.layout}>

                <Grid xs={5} item className={classes.leftLayout}>

                </Grid>

                <Grid xs={7} item className={classes.rightLayout}>
                    <Grid container justify="center">

                        <Grid xs={12} item className={classes.xsMarginBottom}>
                            <form>
                                <Grid spacing={16} alignItems='top' container>
                                    <Grid xs={4} item>
                                        <TextField
                                            error={!!errorMsg}
                                            required
                                            className={classes.textfield}
                                            name="memberEmail"
                                            id='email'
                                            label="Email"
                                            margin="normal"
                                            variant="outlined"
                                            type="email"
                                            fullWidth
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </Grid>
                                    <Grid xs={4} item>
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
                                        >
                                            Forgot password
                                        </Button>
                                    </Grid>
                                    <Grid xs={4} item>
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

                        <Grid xs={12} item className={classes.paddingSide}>

                            <Grid justify='center' container className={classes.xsMarginBottom}>
                                <Grid item>
                                    <img src={logo} width="100"/>
                                </Grid>
                            </Grid>

                            <Typography variant="h4" gutterBottom className={classes.xsMarginBottom}>
                                Start managing your projects and share them
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Join Prello today
                            </Typography>

                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                className={classes.button}
                            >
                                Sign In with Github
                                <CloudIcon className={classes.rightIcon} />
                            </Button>

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
    onLogin : _action.signinAction.signin
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Signin));