import _action from '../actions';

const labels = _action.signinAction.labels
const labelsNavbar = _action.navbarAction.labels
const labelsProfile = _action.profileAction.labels
const labelsSignup = _action.signupAction.labels


const initialState = {
    isLoading: true,
    isPasswordReset: false,
    member: {
        memberId: -1,
        memberFirstname: 'unknow',
        memberLastname: 'unknow',
        memberPseudo: 'unknow',
        memberEmail: 'unknow@gmail.com'
    }
}

export function signin (state = initialState, action){
    switch (action.type) {
        case labels.LOGIN:
            return {
                ...state,
                member: action.payload.member,
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
                member: {},
                isLogged: action.payload.isLogged,
                isLoading: false
            }

        case labelsNavbar.LOG_OFF:
            return {
                ...state,
                isLogged: false,
                member: {},
                isLoading: false
            }

        case labelsProfile.UPDATE_MEMBER:
            return {
                ...state,
                member: action.payload.member,
            }

        case labels.NEW_PASSWORD_SENT:
            return {
                ...state,
                isPasswordReset: true,
                resetPasswordMsg: 'New password sent.'
            }

        case labels.NEW_PASSWORD_FAILED:
            return {
                ...state,
                isPasswordReset: true,
                resetPasswordMsg: 'No email adress found.'
            }

        case labels.RESET_FIELD:
            return {
                ...state,
                isPasswordReset: false,
                resetPasswordMsg: ''
            }

        default:
            return state
    }
}
