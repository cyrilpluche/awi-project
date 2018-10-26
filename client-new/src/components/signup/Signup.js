import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
import { style } from './Style'

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

class Signup extends React.Component {
    constructor (props) {
        super(props)

        this.submit = this.submit.bind(this);

        this.state = {
            memberFirstname: '',
            memberLastname: '',
            memberPseudo: '',
            memberEmail: '',
            memberPassword: '',
            memberCheckPassword: '',
        };
    }


    submit () {
        //this.props.onLogin(memberEmail, memberPassword)
        let memberFirstname = this.state.memberFirstname
        let memberLastname = this.state.memberLastname
        let memberPseudo = this.state.memberPseudo
        let memberEmail = this.state.memberEmail
        let memberPassword = this.state.memberPassword
        let memberCheckPassword = this.state.memberCheckPassword
        if(memberCheckPassword === memberPassword){
            this.props.onAdd(memberFirstname, memberLastname, memberPseudo, memberEmail, memberPassword)
        }else{
            console.log("Mot de passe different")
        }
    }

    handleChange (event) {
        var { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <Icon className={classNames(classes.icon, 'fa fa-plus-circle')} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <form className={classes.form}>
                            <div>
                                <TextField
                                    required
                                    name="memberFirstname"
                                    id="firstname"
                                    label="First Name"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    name="memberLastname"
                                    id="lastname"
                                    label="Last Name"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    name="memberPseudo"
                                    id="pseudo"
                                    label="Pseudo"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.handleChange.bind(this)}
                                />
                            </div>
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
                                <TextField
                                    required
                                    id="checkPassword"
                                    name="memberCheckPassword"
                                    label="Check Password"
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
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    onAdd : _action.signupAction.signup
}

export default connect(null, mapDispatchToProps)(withStyles(style)(Signup));