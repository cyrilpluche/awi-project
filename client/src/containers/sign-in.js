import React, { Component } from 'react'
import {Field,reduxForm} from 'redux-form'
import { Link } from 'react-router-dom'
import {signIn} from "../actions/index"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"


const formConfig ={
  form: 'signInForm'
}

class SignInForm extends Component {

    renderField = ({type, label, input, meta: { touched,error }}) => (
        <div className="input-row">
            <label>{label}</label>
            <input {...input} type={type} value={this.props.label}/>
            {touched && error &&
            <span className="error">{error}</span>}
        </div>
    );

    render () {
        const {handleSubmit} = this.props; 
        console.log(this.props)
        return (
           <form onSubmit={handleSubmit(this.signIn.bind(this)) }>  
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 text-center signin ">
                            <h1>Connexion</h1>
                            <div>
                                <label>Email</label>
                                <Field name="login" component={this.renderField} type='text'/>                                          
                            </div>

                            <div>
                                <label >Mot de passe</label>
                                <Field name="password" component={this.renderField} type='text'/>                                                   
                            </div>

                            <Link  to="/"><button className="btn btn-primary" type="submit">Se connecter</button> </Link>
                        </div>
                   </div>
                </div>       
                         
            </form>
        
        )
    }

    signIn(user){
        this.props.signIn(user)        
    }

}



const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({signIn}, dispatch)
});

export default connect(null, mapDispatchToProps)(reduxForm(formConfig)(SignInForm));