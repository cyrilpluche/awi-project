import { updateCardAction } from '../actions/UpdateCard.action';

const labels = updateCardAction.labels

const initialState = {
    card: {
        cardId: 1,
        cardTitle: 'Clean the github',
        cardDescription: 'By merging all branches update the master branch',
        cardStatus: 0,
        cardDateTarget: null,
        cardDateEnd: null,
        cardFather: null,
        cardChild: null,
        listId: 1,
        cardhaslabelLabels: {
            labelId: 1,
            labelColor: 1,
            labelDescription: 'BACKEND'
        },
        members: 'H',
        comments: 'Without comments'
        /*deadline: 'January 10, 2018',
        labels: 'BACKEND',*/
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
