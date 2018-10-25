import _service from '../services'

const labels = {
    LOGIN : "LOGIN",
    ERROR : "ERROR",
    CREATE_USER : "CREATE_USER"
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
                localStorage.setItem('token', res.token)
                dispatch(signSuccess(res));
            })
            .catch((err) => {
                dispatch(signError)
            });

    }
}

export const signinAction = {
    labels,
    signin
}