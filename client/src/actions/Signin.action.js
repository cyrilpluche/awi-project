import _service from '../services'
import _helper from '../helpers';

const labels = {
    LOGIN : "LOGIN",
    ERROR : "ERROR",
    CREATE_USER : "CREATE_USER",
    IS_LOGGED: "IS_LOGGED",
    IS_NOT_LOGGED: "IS_NOT_LOGGED",
    NEW_PASSWORD_SENT: "NEW_PASSWORD_SENT",
    NEW_PASSWORD_FAILED: "NEW_PASSWORD_FAILED",
    RESET_FIELD: "RESET_FIELD"
}

const signSuccess = member => ({
    type: labels.LOGIN,
    payload: {
        member: member
    }
})

const signError = {
    type: labels.ERROR,
    payload: "Email or password is incorrect.",
}

function signin (memberEmail, memberPassword, redirection) {
    const body = {
        memberEmail: memberEmail,
        memberPassword: memberPassword
    }
    return dispatch => {
        _service.Member.signIn(body)
            .then(res => {
                localStorage.setItem('memberToken', res.memberToken)
                dispatch(signSuccess(res));
                if (redirection) _helper.History.push(redirection);
            })
            .catch((err) => {
                dispatch(signError)
            });
    }
}

function isMemberLogged () {
    return (dispatch) => {
        var memberToken = localStorage.getItem('memberToken')
        if (memberToken) {
            _service.Member.isLogged()
                .then(res => {
                    dispatch({
                        type: labels.IS_LOGGED,
                        payload: res
                    })
                })
        } else {
            dispatch({
                type: labels.IS_NOT_LOGGED,
                payload: { isLogged: false }
            })
        }
    }
}

function sendNewPassword (memberEmail) {
    return dispatch => {
        _service.Member.sendNewPassword(memberEmail)
            .then(res => {
                dispatch({
                    type: labels.NEW_PASSWORD_SENT
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.NEW_PASSWORD_FAILED
                })
            });
    }
}

function resetField () {
    return dispatch => {
        dispatch({
            type: labels.RESET_FIELD

        })
    }
}

function signinWithGithub () {


    return dispatch => {

        _service.Member.signInWithGithub()
            .then(res => {
                //localStorage.setItem('token', res.token)
                //_helper.History.push('/home');
                window.location.assign(res)
            })
            .catch((err) => {
                dispatch(signError)
            });

    }
}

function confirmSigninGithub (memberEmail, token) {
    console.log("token \n", token)
    const body={
        memberEmail: memberEmail,
        //memberToken: token,
    }
    localStorage.setItem('memberToken', token)
    return dispatch => {
        _service.Member.get(body)
            .then(res => {
                console.log("res get \n", res);

                _helper.History.push('/home');
                dispatch(signSuccess(res));
            })
            .catch((err) => {
                dispatch(signError)
            });
    }

}

export const signinAction = {
    labels,
    signin,
    signinWithGithub,
    confirmSigninGithub,
    isMemberLogged,
    sendNewPassword,
    resetField
}