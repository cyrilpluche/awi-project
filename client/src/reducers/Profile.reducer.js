import { profileAction } from '../actions/Profile.action';

const labels = profileAction.labels

const initialState = {
    updatePasswordMsg: '',
    isPasswordUpdated: false,
    isPasswordError: false
};

export function profile (state = initialState, action) {
    switch (action.type) {
        case labels.UPDATE_PASSWORD:
            return { ...state,
                updatePasswordMsg: action.payload.updatePasswordMsg,
                isPasswordUpdated: true,
                isPasswordError: false
            };

        case labels.UPDATE_PASSWORD_ERROR:
            return {
                ...state,
                updatePasswordMsg: action.payload.updatePasswordMsg,
                isPasswordUpdated: false,
                isPasswordError: true
            };

        default:
            return state
    }
};
