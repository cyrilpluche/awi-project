import React from 'react'
import { connect } from 'react-redux'
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoaderPage from "../../loaderPage/LoaderPage";
import _helper from "../../../helpers"
import _action from "../../../actions"


class TokenVerification extends React.Component {
    constructor (props) {
        super(props)

    }

    componentDidMount () {
        let params = this.props.location.pathname.split('/')
        let token = params[2]
        this.props.onValidateAccountWithToken(token)
        //Method that decrypt the token in server, update the given email else error
        // push to account-validation if ok, push to home else
    }

    render() {
        const {classes} = this.props;
        return (
            <div>

                <LoaderPage/>
            </div>
        )
    }
}

TokenVerification.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    onValidateAccountWithToken: _action.signupAction.validateAccountWithToken
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(TokenVerification));