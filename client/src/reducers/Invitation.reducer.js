import { invitationAction } from '../actions/Invitation.action';

const labels = invitationAction.labels

const initialState = {
    isLoading: true,
    projectTitle: 'abracadabra'
};

export function invitation (state = initialState, action) {
    switch (action.type) {
        case labels.MEMBER_EXIST:
            return { ...state,
                projectTitle: action.payload.informations.projectTitle,
                informations: action.payload.informations,
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

        default:
            return state
    }
};
