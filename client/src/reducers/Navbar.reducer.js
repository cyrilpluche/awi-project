import { navbarAction } from '../actions/Navbar.action';

const labels = navbarAction.labels;

const initialState = { notifications: [] };

export function navbar (state = initialState, action) {
    switch (action.type) {
        case labels.GET_ALL_NOTIFICATIONS:
            return { ...state, notifications: action.payload };

        case labels.GET_ALL_NOTIFICATIONS_ERROR:
            return state;

        default:
            return state
    }
};
