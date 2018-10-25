import React, { Component } from 'react'
import _action from '../../actions'
import {connect} from "react-redux"


// Css imports
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
import { bindActionCreators } from 'C:/Users/Mehdi/AppData/Local/Microsoft/TypeScript/3.1/node_modules/redux';



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

    constructor(props){
        super(props);
        this.signIn = this.signIn.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }

    onLogin(auth){
        this.props.onLogin(auth)
    }

    handleChange(e) {
        
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state.email)
    }

   /* submit = () => {
        let auth = {
            email : this.state.email,
            password : this.state.password
        }

        this.onLogin(auth)
    }*/

   handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        console.log(email)
        console.log(password)
        let auth = {
            email : this.state.email,
            password : this.state.password
        }
        
        console.log(auth)
        
            //dispatch(_action.signinAction.signin(auth.email, password));
        
    }



    render () {
        
        const { handleSubmit,classes } = this.props; 
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
                        <form onSubmit={handleSubmit} className={classes.form}>                                                                 
                            <div>
                                <TextField 
                                    id="email" 
                                    required 
                                    type='text' 
                                    label="Email" 
                                    name="email" 
                                    margin="normal" 
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={this.handleChange.bind(this)} 
                                    fullWidth/>
                                
                            </div>
                            <div>
                                <TextField 
                                    id="password" 
                                    required 
                                    type='password' 
                                    label="Password"  
                                    margin="normal" 
                                    variant="outlined"
                                    name="password"
                                    value={this.state.passwoord}
                                    onChange={this.handleChange.bind(this)} 
                                    fullWidth/>
                                
                            </div>                                                                                    
                            <div>
                                <Button variant="contained" fullWidth color="primary" className={classes.submit} type={'submit'}>
                                    Sign In
                                </Button>
                            </div>
                            <div>
                                <Button variant="contained" fullWidth color="default" className={classes.submit} type={'submit'}>
                                    Sign In with Github
                                </Button>
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

  const mapDispatchToProps = (dispatch) =>{
      return bindActionCreators({
          onLogin : _action.signinAction.signin
      })
  }


export default connect(null,mapDispatchToProps)(withStyles(styles)((SignInForm)));