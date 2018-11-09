import _action from '../actions';

const labels = _action.signupAction.labels


const initialState = {
    isAccountValidNow: false,
    msgError: ['', ''],
    isInvitation: false,
    isLoading: false
}

export function signup (state = initialState, action){

    switch (action.type) {
        case labels.LOAD_SIGNUP:
            return {
                ...state,
                isLoading: true
            }

        case labels.SIGN_UP:
            return {
                ...state,
                isLoading: false,
                msgError: ['', '']
            };

        case labels.SIGN_UP_ERROR:
            return {
                ...state,
                isLoading: false,
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
