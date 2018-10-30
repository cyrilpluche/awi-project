import _service from '../services'
import _helper from '../helpers';

const labels = {
    //LOGIN : "LOGIN",
    ADD : "ADD",
    ERROR : "ERROR",
    CREATE_USER : "CREATE_USER",
    LOADING: "LOADING",
    VALIDATE_ACCOUNT_TOKEN: "VALIDATE_ACCOUNT_TOKEN",
    VALIDATE_ACCOUNT_TOKEN_ERROR: "VALIDATE_ACCOUNT_TOKEN_ERROR"
}

const signSuccess = token => ({
    type: labels.ADD,
    payload: token,
})

const signError = {
    type: labels.ERROR,
    payload: "Sign up process failed.",
}

function signup (memberFirstname, memberLastname, memberPseudo, memberEmail, memberPassword) {
    const body = {
        memberFirstname: memberFirstname,
        memberLastname: memberLastname,
        memberPseudo: memberEmail,
        memberEmail: memberEmail,
        memberPassword: memberPassword,
        memberStatus: 0
    }
    return dispatch => {
        _service.Member.signUp(body)
            .then(res => {
                _helper.History.push('/home');
                dispatch(signSuccess(res));
            })
            .catch((err) => {
                dispatch(signError)
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