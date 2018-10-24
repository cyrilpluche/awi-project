import React from 'react';
import {bindActionCreators} from "redux";
import {signUp} from "../../actions/index";
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { reduxForm } from 'redux-form'
import Button from "@material-ui/core/Button/Button";
import Form from "redux-form/es/Form";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    }
});

class SignUpForm extends React.Component {
    constructor(props){
        super(props);
        this.onAddUser = this.onAddUser.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            showPassword: false,
        };

    }
    onAddUser(newUser){
        this.props.onAddUser(newUser)
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    submit = () =>{
            let newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            };
            this.onAddUser(newUser)
    };

    render() {
        const {handleSubmit, classes} = this.props;
        return (
            <Form className={classes.marginDense} onSubmit={handleSubmit(this.submit)}>
                <TextField
                    id="signUpFirstName"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    label="First name"
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    required
                    //helperText="Weight"
                />
                <TextField
                    id="signUpLastName"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    label="Last name"
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    required
                    //helperText="Weight"
                />
                <TextField
                    id="signUpEmail"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    required
                    //helperText="Weight"
                />
                <TextField
                    id="signUpPassword"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" color="primary" className={classes.button} type={'submit'}>
                    SIGN UP
                </Button>
            </Form>
        )
    }
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

SignUpForm = reduxForm({form: 'signup'})(SignUpForm);

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        onAddUser: signUp
    },dispatch);
};

export default connect(null, mapActionsToProps)(withStyles(styles)(SignUpForm));
