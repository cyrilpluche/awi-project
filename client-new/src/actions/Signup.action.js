import _service from '../services'
import _helper from '../helpers';

const labels = {
    //LOGIN : "LOGIN",
    ADD : "ADD",
    ERROR : "ERROR",
    CREATE_USER : "CREATE_USER",
    IS_LOGGED: "IS_LOGGED"
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
                localStorage.setItem('memberToken', res.memberToken)
                _helper.History.push('/home');
                dispatch(signSuccess(res));
            })
            .catch((err) => {
                dispatch(signError)
            });
    }
}

function isMemberLogged () {
    return (dispatch) => {
        if (localStorage.getItem('memberToken')) {
            _service.Member.isLogged()
                .then(res => {
                    dispatch({
                        type: labels.IS_LOGGED,
                        payload: res
                    })
                })
        } else {
            dispatch({
                type: labels.IS_LOGGED,
                payload: false
            })
        }
    }
}

export const signupAction = {
    labels,
    signup,
    isMemberLogged
}