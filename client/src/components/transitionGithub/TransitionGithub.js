import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
//import { style } from './Style'
import Loader from '../loaderPage/LoaderPage'


// CSS imports
//import { withStyles } from '@material-ui/core/styles';
//import PropTypes from 'prop-types';



class TransitionGithub extends React.Component {
    constructor (props) {
        super(props)
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
    }


    render() {
        return (
            <Loader/>
        )
    }


}

// Signin.propTypes = {
//     classes: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
    onConfirmSigninGithub: _action.signinAction.confirmSigninGithub,

}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionGithub);