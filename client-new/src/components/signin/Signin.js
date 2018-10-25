import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
import { style } from './Style'


// CSS imports
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';

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
        console.log(memberEmail)
        console.log(memberPassword)
        this.props.onLogin(memberEmail, memberPassword)
    }

    handleChange (event) {
        var { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />

                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <Icon className={classNames(classes.icon, 'fa fa-plus-circle')} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <form className={classes.form}>
                            <div>
                                <TextField
                                    required
                                    name="memberEmail"
                                    id="email"
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    type="email"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                />

                            </div>
                            <div>
                                <TextField
                                    required
                                    id="password"
                                    name="memberPassword"
                                    label="Password"
                                    margin="normal"
                                    variant="outlined"
                                    type="password"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                />

                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    fullWidth color="primary"
                                    onClick={this.submit}
                                >
                                    Sign In
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    fullWidth color="default"
                                >
                                    Sign In with Github
                                </Button>
                            </div>

                        </form>

                    </Paper>
                </main>

            </React.Fragment>
        )
    }


}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    onLogin : _action.signinAction.signin
}

export default connect(null, mapDispatchToProps)(withStyles(style)(Signin));