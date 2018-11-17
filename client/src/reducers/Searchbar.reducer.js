import { searchbarAction } from '../actions/Searchbar.action';

const labels = searchbarAction.labels

const initialState = {
    projectsFound: [],
    listsFound: [],
    cardsFound: []
};

export function searchbar (state = initialState, action) {
    switch (action.type) {
        case labels.SEARCH_PROJECTS:
            return { ...state,
                projectsFound: action.payload
            };

        case labels.SEARCH_PROJECTS_ERROR:
            return {
                ...state,
                projectsFound: []
            };

        case labels.SEARCH_LISTS:
            return { ...state,
                listsFound: action.payload
            };

        case labels.SEARCH_LISTS_ERROR:
            return {
                ...state,
                listsFound: []
            };

        case labels.SEARCH_CARDS:
            return { ...state,
                cardsFound: action.payload
            };

        case labels.SEARCH_CARDS_ERROR:
            return {
                ...state,
                cardsFound: []
            };

        case labels.SEARCH_RESET:
            return {
                ...state,
                projectsFound: [],
                listsFound: [],
                cardsFound: []
            };

        default:
            return state
    }
};
