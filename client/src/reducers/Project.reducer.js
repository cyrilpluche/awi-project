import { projectAction } from '../actions/Project.action';

const projectLabels = projectAction.labels

const initialState = {
    lists: []
};

export function project (state = initialState, action) {
    switch (action.type) {
        case projectLabels.GET_ALL_LISTS:
            return {
                ...state,
                lists: action.payload,
            };
        default:
            return state
    }
}