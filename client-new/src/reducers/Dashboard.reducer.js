import { dashboardAction } from '../actions/Dashboard.action';

const labels = dashboardAction.labels

const initialState = {
    project: {
        projectTitle: 'Hello Moto'
    }
};

export function dashboard (state = initialState, action) {
    switch (action.type) {
        case labels.SELECT_PROJECT:
            return { ...state, project: action.project };
        case labels.FIND_ONE_PROJECT:
            return { ...state, loading: true };
        case labels.RECEIVE_PROJECT:
            return { ...state, project: action.json, loading: false };
        default:
            return state
    }
};
