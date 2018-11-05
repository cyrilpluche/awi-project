import { updateCardAction } from '../actions/UpdateCard.action';

const labels = updateCardAction.labels

const initialState = {
    card: {
        id: "1",
        title: 'Clean the github',
        deadline: 'January 10, 2018',
        description: 'By merging all branches update the master branch',
        labels: 'BACKEND',
        members: 'H',
        comments: 'Without comments'
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
