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
        case projectLabels.CREATE_LIST: 
            let lists = [...state.lists,action.payload]
            return {
                ...state,
                lists 
            };
        default:
            return state
    }
}