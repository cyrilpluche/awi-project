import _service from '../services'
import _helper from '../helpers';

const labels = {
    //LOGIN : "LOGIN",
    ADD : "ADD",
    ERROR : "ERROR",
    CREATE_USER : "CREATE_USER",
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

export const signupAction = {
    labels,
    signup
}