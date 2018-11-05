import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
import _helper from '../../helpers'
import { style } from './Style'
import logo from '../../public/images/prello-logo-2.png'

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid/Grid";

class Signup extends React.Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.generateTextfields = this.generateTextfields.bind(this)
        this.submit = this.submit.bind(this);

        this.state = {
            memberFirstname: '',
            memberLastname: '',
            memberPseudo: '',
            memberEmail: '',
            memberPassword: '',
            memberCheckPassword: ''
    };

        if (props.invitation) {
            this.state.memberEmail = props.invitation.memberEmail
        }
    }

    submit () {
        this.props.onAdd(this.state, this.props.invitation)
    }

    goBackToLogin () {
        _helper.History.push('/login')
    }

    handleChange (event) {
        var { name, value } = event.target;
        this.setState({ [name]: value });
    }

    // Loop that create textfields
    generateTextfields = () => {
        const labelsForClient = [
            'First name',
            'Last name',
            'Pseudo',
            'Email',
            'Password',
            'Password confirmation'
        ]
        const type = [
            'text',
            'text',
            'text',
            'email',
            'password',
            'password'
        ]

        let values = Object.values(this.state)
        let keys = Object.keys(this.state)
        var textfields = [];
        let index = 0

        for (let item of values) {
            textfields.push(
                <TextField
                    error={
                        this.props.errorMsg[1] === keys[index] ||
                        (this.props.errorMsg[1] === 'all' && item === '')
                    }
                    disabled={this.props.invitation && type[index] === 'email'}
                    required
                    key={keys[index]}
                    name={keys[index]}
                    label={labelsForClient[index]}
                    value={item}
                    fullWidth
                    type={type[index]}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
            )
            index += 1
        }
        return textfields
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid justify='center' className={classes.layout} container>
                <Grid justify='center' container className={classes.logo}>
                    <Grid item>
                        <img src={logo} width="60" alt="prello logo"/>
                    </Grid>
                </Grid>
                <Typography component="h1" variant="h5">
                    Create your account
                </Typography>

                <Grid justify='center' container className={ classes.marginBottom }>
                    <Grid xs={10} sm={6} md={4} item>
                        <form className={classes.form}>
                            {this.generateTextfields()}
                        </form>

                        <Grid container>
                            <Grid container justify="center" className={ classes.marginBottom }>
                                <Typography variant="overline">
                                    {this.props.errorMsg[0]}
                                </Typography>
                            </Grid>
                            <Grid xs={6} className={ classes.paddingRight } item>
                                <Button
                                    variant="outlined"
                                    fullWidth color="primary"
                                    onClick={this.goBackToLogin}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid xs={6} className={ classes.paddingLeft } item>
                                <Button
                                    variant="contained"
                                    fullWidth color="primary"
                                    onClick={this.submit}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errorMsg: state.signup.msgError,
    isInvitation: state.signup.isInvitation
})

const mapDispatchToProps = {
    onAdd : _action.signupAction.signup
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Signup));