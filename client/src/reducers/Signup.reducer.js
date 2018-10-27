import _action from '../actions';

const labels = _action.signupAction.labels

const initialState = ""

export function signup (state = initialState, action){
    switch (action.type) {
        case labels.ADD:
            return {
                ...state,
                member: action.payload,
                isLogged: true
            };

        case labels.ERROR:
            return {
                ...state,
                isLogged: false,
                msgError: action.payload
            }

        default:
            return state
    }
}
