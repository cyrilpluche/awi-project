import { dashboardAction } from '../actions/Dashboard.action';
import Helper from '../helpers'

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
            return { ...state, project: action.project, errorMsg: '' };

        case labels.FIND_ONE_PROJECT:
            return { ...state, loading: true, errorMsg:'' };

        case labels.RECEIVE_PROJECT:
            return { ...state, project: action.json, loading: false, errorMsg:'' };

        case labels.SELECT_ALL_PROJECT_MEMBER:
            return { ...state, projects:action.payload, errorMsg: '' };

        case labels.UPDATE_MEMBER_HAS_PROJECT:
            let newProjects = Helper.Method.copy(state.projects)
            let found = false

            for (let i =0; i < newProjects.length; i++) {
                if (action.payload.projectId === newProjects[i].projectId) {
                    found = true
                    newProjects[i].projectIsFavorite = action.payload.projectIsFavorite
                }
            }

            return { ...state, projects:newProjects, errorMsg:'' };

        case labels.CREATE_NEW_PROJECT:
            return state // TODO
        case labels.DASHBOARD_ACTION_ERROR:
            return {...state, errorMsg: action.errorMsg}

        case labels.DASHBOARD_HIDE_ERROR_MSG:
            return { ...state, errorMsg:'' }
        default:
            return state
    }
};
