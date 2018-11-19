import _action from '../actions';

const labels = _action.dashboardFixAction.labels

const initialState = {
    isLoading: false,
    projects: []
};

export function dashboardFix (state = initialState, action) {
    switch (action.type) {
        case labels.LOAD_DASHBOARD:
            return {
                ...state,
                isLoading: true
            };

        case labels.CREATE_PROJECT:
            let newProjects = Array.from(state.projects)
            newProjects.push(action.payload)

            return {
                ...state,
                isLoading: false,
                projects: newProjects
            };

        case labels.CREATE_PROJECT_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case labels.LOAD_ALL_PROJECTS_FOR_MEMBER:
            return {
                ...state,
                isLoading: false,
                projects: action.payload
            };

        case labels.LOAD_ALL_PROJECTS_FOR_MEMBER_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case labels.SET_PROJECT_FAVORITE:
            let newProjects1 = Array.from(state.projects)
            let index = action.payload.index
            newProjects1[index].project.projectIsFavorite = !newProjects1[index].project.projectIsFavorite
            return {
                ...state,
                isLoading: false,
                projects: newProjects1
            };

        case labels.SET_PROJECT_FAVORITE_ERROR:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state
    }
};
