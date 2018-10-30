import { updateCardAction } from '../actions/UpdateCard.action';

const labels = updateCardAction.labels

const initialState = {
    card: {
        cardInfo: 'Initial state test'
    }
};

export function updatecard (state = initialState, action) {
    switch (action.type) {
        case labels.UPDATE_CARD:
            return { ...state, card: action.payload };
        default:
            return state
    }
};
