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
    isLoading: false,
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
        case labels.LOAD:
            return { ...state, isLoading: true };
        case labels.UPDATE_CARD:
            return { ...state, card: action.payload };
        case labels.CREATE_TASK:
            return { ...state,
                card: action.payload,
                isLoading: false
            };
        case labels.DELETE_TASK:
            return { ...state, card: action.payload };
        case labels.GET_CARD:
            return { ...state, card: action.payload };
        case labels.GET_ALL_LABEL:
            return { ...state, labels: action.payload };
        case labels.UPDATE_TASK:
            return { ...state, card: action.payload };
        case labels.DELETE_CARD:
            return { ...state}; //TODO Handle Payload if delete
        default:
            return state
    }
};
