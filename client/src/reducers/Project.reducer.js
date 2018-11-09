import { projectAction } from '../actions/Project.action';
import { listAction } from '../actions/List.action';
import { cardAction } from '../actions/Card.action';

const projectLabels = projectAction.labels
const listLabels = listAction.labels
const cardLabels = cardAction.labels

const initialState = {
    lists: [],
    members: [],
    isLoading: false,
    activities: [],
    permissions: []
};

export function project (state = initialState, action) {
   
    switch (action.type) {
        case projectLabels.LOAD:
            return {
                ...state,
                isLoading: true
            };

        case cardLabels.LOAD_PROJECT:
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
            let newList = action.payload
            newList.CardListFks = []
            let lists = [...state.lists,newList]
            return {
                ...state,
                lists 
            };
        case listLabels.CREATE_CARD:
            let listWithCard = Array.from(state.lists)
            let findList = listWithCard.find(list => list.listId === action.payload.listId)
            let findListIndex = listWithCard.findIndex(list => list.listId === action.payload.listId)
            
            findList.CardListFks.push(action.payload)
            listWithCard.splice(findListIndex,1)
            listWithCard.splice(findListIndex,0,findList)
            
            return {
                ...state,
                lists : listWithCard,
                isLoading:false
            }; 
        case listLabels.UPDATE_CARD:   
            return {
                ...state,
                lists : action.payload
            }; 
        case listLabels.GET_ALL_CARDS:
            return {
                ...state,
                cards: action.payload,
            }; 
        case listLabels.UPDATE_LIST_TITLE:
            let updateList  = state.lists.find(list => list.listId === action.payload.listId)
            let updateListIndex =  state.lists.findIndex(list => list.listId === action.payload.listId)
            let newListTitle = {...updateList, listTitle:action.payload.newListTitle}
            let allList = Array.from(state.lists)
            allList.splice(updateListIndex,1)
            allList.splice(updateListIndex,0,newListTitle)
            return {
                ...state,
                lists: allList
            };
        case listLabels.UPDATE_LIST_STATUS:
            let updateListStatus  = state.lists.find(list => list.listId === action.payload.listId)
            let updateListStatusIndex =  state.lists.findIndex(list => list.listId === action.payload.listId)
            let newListStatus = {...updateListStatus, listStatus:action.payload.listStatus}
            let newLists = Array.from(state.lists)
            newLists.splice(updateListStatusIndex,1)
            newLists.splice(updateListStatusIndex,0,newListStatus)
            return {
                ...state,
                lists: newLists
            };
        case listLabels.DELETE_LIST:

        const deletedListIndex = state.lists.findIndex(list => list.listId === action.payload )
        let newlists = Array.from(state.lists)
        newlists.splice(deletedListIndex,1)
            
            return {
                ...state,
                lists: newlists,
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

        case projectLabels.INVITATION_ERROR || projectLabels.GET_ALL_PERMISSIONS_ERROR || projectLabels.UPDATE_PERMISSION_MEMBER_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case projectLabels.GET_ALL_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload,
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

        case projectLabels.UPDATE_PERMISSION_MEMBER:
            return {
                ...state,
                members : action.payload
            };
        case listLabels.UPDATE_POSITION_LISTS:
            
            return {
                ...state,
                lists : action.payload
            };

        case cardLabels.DELETE_CARD:
            let updatedLists = Array.from(state.lists)
            updatedLists[action.payload.listIndex].CardListFks.splice(action.payload.cardIndex, 1)
            return {
                ...state,
                lists : updatedLists,
                isLoading: false
            };

        default:
            return state
    }
}