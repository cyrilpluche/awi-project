import _action from '../actions';

const labels = _action.signinAction.labels

const initialState = { isLoading: true }

export function signin (state = initialState, action){
    console.log(action)
    switch (action.type) {
        case labels.LOGIN:
            return {
                ...state,
                member: action.payload,
                isLogged: true,
                isLoading: false
            };

        case labels.ERROR:
            return {
                ...state,
                msgError: action.payload,
                isLogged: false
            }

        case labels.IS_LOGGED:
            return {
                ...state,
                member: action.payload.member,
                isLogged: action.payload.isLogged,
                isLoading: false
            }

        case labels.IS_NOT_LOGGED:
            return {
                ...state,
                isLogged: action.payload.isLogged,
                isLoading: false
            }

        default:
            return state
    }
}
