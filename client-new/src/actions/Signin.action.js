import _service from '../services'
import _helper from '../helpers';

const labels = {
    LOGIN : "LOGIN",
    ERROR : "ERROR",
    CREATE_USER : "CREATE_USER",
    IS_LOGGED: "IS_LOGGED"
}

const signSuccess = token => ({
    type: labels.LOGIN,
    payload: token,
})

const signError = {
    type: labels.ERROR,
    payload: "Email or password is incorrect.",
}

function signin (memberEmail, memberPassword) {
    const body = {
        memberEmail: memberEmail,
        memberPassword: memberPassword
    }
    return dispatch => {
        _service.Member.signIn(body)
            .then(res => {
                console.log(res)
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

export const signinAction = {
    labels,
    signin,
    isMemberLogged
}