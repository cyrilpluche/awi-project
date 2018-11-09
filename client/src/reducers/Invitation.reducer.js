import { invitationAction } from '../actions/Invitation.action';
import { signupAction } from '../actions/Signup.action';

const labels = invitationAction.labels
const labelsSignup = signupAction.labels

const initialState = {
    isLoading: true,
};

export function invitation (state = initialState, action) {
    switch (action.type) {
        case labelsSignup.LOAD_INVITATION:
            return { ...state,
                isLoading: true
            };
        case labels.MEMBER_EXIST:
            return { ...state,
                project: action.payload.project,
                member: action.payload.member,
                isAccountExist: true,
                isAccountValid: action.payload.isAccountValid,
                isLoading: false
            };

        case labels.MEMBER_NOT_EXIST:
            return {
                ...state,
                informations: action.payload.informations,
                isAccountExist: false,
                isLoading: false
            };

        case labels.DECRYPT_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case labels.INVITATION_REPLY:
            return {
                ...state,
                isLoading: false
            };

        case labels.INVITATION_REPLY_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case labelsSignup.INVITATION_ACCEPTED:
            return {
                ...state,
                isAccountValidNow: true,
                isLoading: false,
                member: action.payload.member
            }

        default:
            return state
    }
};
