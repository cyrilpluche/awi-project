
const AT_PRELLO = {
    LOGIN : "LOGIN",
    ERROR : "ERROR",
    CREATE_USER : "CREATE_USER"
}



export default function signin(username, password) {
    return dispatch => {
        console.log("dans l'action")
       return dispatch({type:AT_PRELLO.LOGIN,payload:{username, password}})
       /* dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );*/
    }
}

export const signinAction = {
    AT_PRELLO,
    signin
}