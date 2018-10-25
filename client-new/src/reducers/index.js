import { dashboardAction } from '../actions/Dashboard.action';

const labels = dashboardAction.labels

const reducer = (state = {}, action) => {
    switch (action.type) {
        case labels.SELECT_PROJECT:
            return { ...state, project: action.project };
        case labels.FIND_ONE_PROJECT:
            return { ...state, loading: true };
        case labels.RECEIVE_PROJECT:
            return { ...state, project: action.json, loading: false };
        default:
            return {
                project: {
                    projectTitle: "Wesh alors"
                }
            };
    }
};
export default reducer;