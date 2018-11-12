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
    membersOnCard: [],
    membersOffCard: []
};

export function card (state = initialState, action) {
    switch (action.type) {
        case labels.LOAD_CARD:
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
            return { ...state};
        case labels.ADD_MEMBER_ON_CARD:
            return {
                ...state,
                membersOnCard: action.payload.membersOnCard,
                membersOffCard: action.payload.membersOffCard,
                isLoading: false
            };

        case labels.DELETE_MEMBER:
            return {
                ...state,
                membersOnCard: action.payload.membersOnCard,
                membersOffCard: action.payload.membersOffCard,
                isLoading: false
            };

        case labels.DELETE_MEMBER_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case labels.ADD_MEMBER_ON_CARD_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case labels.FIND_ALL_MEMBERS_ON_CARD_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case labels.FIND_ALL_MEMBERS_ON_CARD:{
            return {
                ...state,
                membersOnCard: action.payload.membersOnCard,
                membersOffCard: action.payload.membersOffCard,
                isLoading: false
            };
        }

        default:
            return state
    }
};
