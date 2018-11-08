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
    },
    membersOnCard: [
        { memberId: 1, memberPseudo: 'Pluchezerrr' },
        { memberId: 2, memberPseudo: 'Wohou' },
        { memberId: 3, memberPseudo: 'yaye' }
    ],
    membersOffCard: [
        { memberId: 4, memberPseudo: 'Amin' },
        { memberId: 5, memberPseudo: 'Mehdi' },
        { memberId: 6, memberPseudo: 'Enzo' }
    ]
};

export function card (state = initialState, action) {
    switch (action.type) {
        case labels.UPDATE_CARD:
            return { ...state, card: action.payload };
        case labels.GET_CARD:
            return { ...state, card: action.payload };
        case labels.DELETE_CARD:
            return { ...state};
        default:
            return state
    }
};
