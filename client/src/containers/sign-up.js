import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {add_user} from "../actions/user_actions";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'


class SignUpForm extends Component{

    renderField = ({type, label, input, meta: { touched,error }}) => (
        <div className="input-row">
            <label>{label}</label>
            <br/>
            <input {...input} type={type} value={this.props.label}/>
            {touched && error &&
            <span className="error">{error}</span>}
        </div>
    );

    submit = (values) =>{
        console.log(values)
        //ToDo Put this functionality show password
        /*let error = {};
        let isError = false;

        if(!signUpFirstName || signUpFirstName.trim === ''){
            error.signUpFirstName = 'Required';
            isError = true;
        }

        if(signUpLastName.trim() === ''){
            error.signUpLastName = 'Required';
            isError = true;
        }

        if(signUpEmail.trim() === ''){
            error.signUpEmail = 'Required';
            isError = true;
        }

        if(signUpPassword.trim() === ''){
            error.signUpPassword = 'Required';
            isError = true;
        }

        if(isError){
            throw new SubmissionError(error)
        }else{
            //ToDo Submit form to server
            console.log("Submit is validated")
        }*/
        //console.log(signUpFirstName)
    };

    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)} className={'form'}>
                <Field name='signUpFirstName' label='Prénom' component={this.renderField} type='text'/>
                <Field name='signUpLastName' label='Nom' component={this.renderField} type='text'/>
                <Field name='signUpEmail' label='Email' component={this.renderField} type='email'/>
                <Field name='signUpPassword' label='Password' component={this.renderField} type='password'/>
                <button type='submit'>Submit</button>
            </form>
        )
    }
}

SignUpForm = reduxForm({
    // a unique name for the form
    form: 'signUp'
})(SignUpForm);

const mapStateToProps = state => {
    return {
        firstname: state.firstname,
        lastname : state.lastname,
        email : state.email,
        password : state.password
    }
};

const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        onAddUser: add_user
    },dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(SignUpForm);