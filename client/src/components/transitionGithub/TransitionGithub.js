import React from 'react'
import { connect } from 'react-redux'
import _action from '../../actions'
//import { style } from './Style'
import Loader from '../loaderPage/LoaderPage'


// CSS imports
//import { withStyles } from '@material-ui/core/styles';
//import PropTypes from 'prop-types';



class TransitionGithub extends React.Component {
    componentDidMount () {
        let params = this.props.location.pathname.split('/')
        let memberToken = params[2]
        localStorage.setItem('memberToken', memberToken)
        this.props.onIsMemberLogged()
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
    onIsMemberLogged: _action.signinAction.isMemberLoggedGithub,

}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionGithub);