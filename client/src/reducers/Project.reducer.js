import { projectAction } from '../actions/Project.action';
import { listAction } from '../actions/List.action';

const projectLabels = projectAction.labels
const listLabels = listAction.labels

const initialState = {
    lists: [],
    cards: [],
    members: [],
    isLoading: false,
    activities: []
};

export function project (state = initialState, action) {
    switch (action.type) {
        case projectLabels.LOAD:
            return {
                ...state,
                isLoading: true
            };

        case projectLabels.GET_ALL_LISTS: 
            return {
                ...state,
                lists:action.payload
            };

        case projectLabels.CREATE_LIST: 
            let lists = [...state.lists,action.payload]
            return {
                ...state,
                lists 
            };
        case listLabels.CREATE_CARD:
    
            return {
                ...state,
                lists : action.payload 
            }; 
        case listLabels.UPDATE_CARD:   
            return {
                ...state,
            }; 
        case listLabels.GET_ALL_CARDS:
            return {
                ...state,
                cards: action.payload,
            }; 
        case listLabels.UPDATE_LIST:
            return {
                ...state,
                lists: action.payload,
            };
        case listLabels.DELETE_LIST:
            return {
                ...state,
                lists: action.payload,
            };
        case projectLabels.GET_PROJECT_INFO:
            return {
                ...state,
                projectInfo: action.payload[0]
            };
        case projectLabels.GET_ALL_MEMBERS:
            return {
                ...state,
                members: action.payload,
                isLoading: false
            };
        //TODO
        case projectLabels.SEND_INVITATION:
            return {
                ...state
            };
        case projectLabels.GET_MEMBER_STATUS:
            return {
                ...state,
                isAdmin : action.payload
            };
        //TODO
        case projectLabels.REMOVE_MEMBER_FROM_PROJECT:
            return {
                ...state,
                isLoading: false
            };
        //TODO
        case projectLabels.SET_MEMBER_ADMIN:
            return {
                ...state,
            };
        //TODO
        case projectLabels.GET_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            };

        case projectLabels.GET_ACTIVITY_ERROR:
            return {
                ...state,
            };

        case projectLabels.GET_ALL_LABELS:
            return {
                 ...state,
            };

        case projectLabels.INVITATION_SUCCESS:
            return {
                ...state,
                isLoading: false
            };

        case projectLabels.INVITATION_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case projectLabels.REMOVE_MEMBER_FROM_PROJECT_ERROR:
                return {
                    ...state,
                    isLoading: false
                };

        case projectLabels.MEMBER_HAS_PROJECT:
            return {
                 ...state,
                 loggedHasProject : action.payload
            };
        default:
            return state
    }
}