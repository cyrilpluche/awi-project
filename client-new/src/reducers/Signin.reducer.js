import _action from '../actions';

const labels = _action.signinAction.labels

const initialState = ""

export function signin (state = initialState, action){
    switch (action.type) {
        case labels.LOGIN:
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

        case labels.IS_LOGGED:
            return {
                ...state,
                isLogged: action.payload
            }

        default:
            return state
    }
}
