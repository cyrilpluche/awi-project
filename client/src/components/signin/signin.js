import React, { Component } from 'react'
import {Field,reduxForm} from 'redux-form'
import { Link } from 'react-router-dom'
import {signIn} from "../../actions/index"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
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

const formConfig ={
  form: 'signInForm',
}

const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,

    },
  });

class SignInForm extends Component{

    renderField = ({type, label,fullWidth, input, meta: { touched,error },...custom}) => (
        <TextField
        required
        type={type}
        label={label}
        className={styles.textField}
        margin="normal"
        variant="outlined"
        value={this.props.label}
        fullWidth
      />
    );

    renderButton =  ({text, type,className,color,fullWidth, meta: { touched,error },...custom}) => (

        <Button

        fullWidth
        variant="contained"
        color={color}
        className={className}
        type={type}
      >{text}

      </Button>
    );

    render () {

        const { handleSubmit, classes } = this.props;
        console.log(this.props)
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
                        <form onSubmit={handleSubmit(this.signIn.bind(this)) } className={classes.form}>
                            <div>
                                <Field name="email" label="Email" component={this.renderField} type='text'/>
                            </div>
                            <div>
                                <Field name="password" label="Password" component={this.renderField}  type='password'/>
                            </div>
                            <div>
                            <Link  to="/Home"><Field name="login" type="submit" component={this.renderButton} text="Sign In"  color="primary" className={classes.submit}/></Link>
                            </div>
                            <div>
                                <Link  to="/Board"> <Field name="github" component={this.renderButton} text="Sign In with Github"  color="default" className={classes.submit}/></Link>
                            </div>

                        </form>
                    </Paper>
                </main>
            </React.Fragment>


        )
    }

    signIn(user){
        this.props.signIn(user)
    }


}

SignInForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({signIn}, dispatch)
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(reduxForm(formConfig)(SignInForm)));