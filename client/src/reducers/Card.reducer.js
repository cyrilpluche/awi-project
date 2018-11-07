import { cardAction } from '../actions/Card.action';

const labels = cardAction.labels

const initialState = {
    card: {
        cardTitle: '',
        cardDescription: '',
        cardStatus: -1,
        cardDateTarget: null,
        cardDateEnd: null,
        cardFather: null,
        cardChild: null,
        listId: null
    }
};

export function card (state = initialState, action) {
    switch (action.type) {
        case labels.UPDATE_CARD:
            return { ...state, card: action.payload };
        case labels.GET_CARD:
            return { ...state, card: action.payload };
        case labels.UPDATE_TASK:
            return { ...state};
        case labels.DELETE_CARD:
            return { ...state};
        default:
            return state
    }
};
