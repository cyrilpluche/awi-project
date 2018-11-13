import _service from '../services'
import _helper from '../helpers';

const labels = {
    //LOGIN : "LOGIN",
    LOAD_SIGNUP: "LOAD_SIGNUP",
    LOAD_INVITATION: "LOAD_INVITATION",
    SIGN_UP : "SIGN_UP",
    SIGN_UP_ERROR : "SIGN_UP_ERROR",
    CREATE_USER : "CREATE_USER",
    LOADING: "LOADING",
    VALIDATE_ACCOUNT_TOKEN: "VALIDATE_ACCOUNT_TOKEN",
    VALIDATE_ACCOUNT_TOKEN_ERROR: "VALIDATE_ACCOUNT_TOKEN_ERROR",
    INVITATION_ACCEPTED: "INVITATION_ACCEPTED",
    INVITATION_ACCEPTED_ERROR: "INVITATION_ACCEPTED"
}

const signSuccess = token => ({
    type: labels.SIGN_UP,
    payload: token,
})

const signError = msg => ({
    type: labels.SIGN_UP_ERROR,
    payload: msg || ['Failed to create the account.', ''],
})

function signup (body, isDirectlyValidate) {
    return dispatch => {
        dispatch({
            type: labels.LOAD_INVITATION
        })
        let checking = checkSignupFields(body)
        if (checking.isFieldsOk) {
            let finalBody = Object.assign({memberStatus: 0}, body)
            if (isDirectlyValidate) {
                // A new member answered to an invitation
                finalBody.memberStatus = 1
                _service.Member.updateMemberInvitation(finalBody)
                    .then(res => {
                        dispatch({
                            type: labels.INVITATION_ACCEPTED,
                            payload: {member: res}
                        });
                    })
                    .catch((err) => {
                        dispatch(signError(err.response.data))
                    });
            } else {
                _service.Member.signUp(finalBody)
                    .then(res => {
                        dispatch(signSuccess(res));
                        _helper.History.push('/home');
                    })
                    .catch((err) => {
                        dispatch(signError(err.response.data))
                    });
            }
        } else {
            console.log(checking.payload)
            dispatch(signError(checking.payload))
        }
    }
}

function checkSignupFields (fields) {
    let isEmpty = false
    for (let field of Object.values(fields)) {
        if (field === '') isEmpty = true
    }
    if (isEmpty) {
        return { isFieldsOk: false, payload: ["Some required fields are empty.", "all"] }
    }
    else if (fields.memberPassword.length < 6) {
        return { isFieldsOk: false, payload: ["Password should be at least 6 characters.", "memberPassword"] }
    } else if (fields.memberPassword !== fields.memberCheckPassword) {
        return {isFieldsOk: false, payload: ["Password confirmation failed.", "memberCheckPassword"]}
    } else {
        return { isFieldsOk: true }
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