import _action from '../actions';

const labels = _action.signupAction.labels


const initialState = {
    isAccountValidNow: false,
    msgError: ['', ''],
    isInvitation: false
}

export function signup (state = initialState, action){

    switch (action.type) {
        case labels.SIGN_UP:
            return {
                ...state,
                member: action.payload,
                isLogged: true,
                msgError: null
            };

        case labels.SIGN_UP_ERROR:
            return {
                ...state,
                isLogged: false,
                msgError: action.payload
            }

        case labels.VALIDATE_ACCOUNT_TOKEN:
            return {
                ...state,
                isAccountValidNow: true
            }

        case labels.VALIDATE_ACCOUNT_TOKEN_ERROR:
            return {
                ...state,
                isAccountValidNow: false
            }

        default:
            return state
    }
}
