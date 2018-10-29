import { projectAction } from '../actions/Project.action';
import { listAction } from '../actions/List.action';

const projectLabels = projectAction.labels
const listLabels = listAction.labels

const initialState = {
    lists: [],
    cards: []
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
        case listLabels.CREATE_CARD:
        let cards = [...state.cards,action.payload]
        return {
            ...state,
            cards 
        }; 
        case listLabels.GET_ALL_CARDS:
        return {
            ...state,
            cards: action.payload,
        }; 
        default:
            return state
    }
}