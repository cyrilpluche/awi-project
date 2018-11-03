import { dashboardAction } from '../actions/Dashboard.action';

const labels = dashboardAction.labels

const initialState = {
    project: {
        projectTitle: 'Hello Moto'
    },
    projects: []
};

export function dashboard (state = initialState, action) {
    switch (action.type) {
        case labels.SELECT_PROJECT:
            return { ...state, project: action.project };

        case labels.FIND_ONE_PROJECT:
            return { ...state, loading: true };

        case labels.RECEIVE_PROJECT:
            return { ...state, project: action.json, loading: false };

        case labels.SELECT_ALL_PROJECT_MEMBER:
            return { ...state, projects: []/*action.payload ||[] */};

        case labels.CREATE_NEW_PROJECT:
            return state // TODO

        default:
            return state
    }
};
