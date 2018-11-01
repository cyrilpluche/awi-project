import _service from '../services'
import _helper from '../helpers';

const labels = {
    //LOGIN : "LOGIN",
    SIGN_UP : "SIGN_UP",
    SIGN_UP_ERROR : "SIGN_UP_ERROR",
    CREATE_USER : "CREATE_USER",
    LOADING: "LOADING",
    VALIDATE_ACCOUNT_TOKEN: "VALIDATE_ACCOUNT_TOKEN",
    VALIDATE_ACCOUNT_TOKEN_ERROR: "VALIDATE_ACCOUNT_TOKEN_ERROR"
}

const signSuccess = token => ({
    type: labels.SIGN_UP,
    payload: token,
})

const signError = msg => ({
    type: labels.SIGN_UP_ERROR,
    payload: msg || 'Failed to create the account.',
})

function signup (body) {
    let finalBody = Object.assign({ memberStatus: 0}, body)
    return dispatch => {
        _service.Member.signUp(finalBody)
            .then(res => {
                _helper.History.push('/home');
                dispatch(signSuccess(res));
            })
            .catch((err) => {
                dispatch(signError(err.response.data))
            });
    }
}

function validateAccountWithToken (memberToken) {
    return dispatch => {
        _service.Member.validateAccount(memberToken)
            .then(res => {
                dispatch({
                    type: labels.VALIDATE_ACCOUNT_TOKEN
                });
                _helper.History.push('/account-confirmation');
            })
            .catch((err) => {
                _helper.History.push('/login');
                dispatch({
                    type: labels.VALIDATE_ACCOUNT_TOKEN_ERROR
                })
            });
    }
}

export const signupAction = {
    labels,
    signup,
    validateAccountWithToken
}