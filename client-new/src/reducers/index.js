import { SELECT_PROJECT, FIND_ONE_PROJECT, RECEIVE_PROJECT } from '../actions';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SELECT_PROJECT:
            return { ...state, project: action.project };
        case FIND_ONE_PROJECT:
            return { ...state, loading: true };
        case RECEIVE_PROJECT:
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