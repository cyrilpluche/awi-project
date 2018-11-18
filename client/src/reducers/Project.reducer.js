import { projectAction } from '../actions/Project.action';
import { listAction } from '../actions/List.action';
import { cardAction } from '../actions/Card.action';
import socket from '../helpers/SocketIo.helper'

const projectLabels = projectAction.labels
const listLabels = listAction.labels
const cardLabels = cardAction.labels

const initialState = {
    lists: [],
    members: [],
    isLoading: false,
    activities: [],
    permissions: [],
    maj: ''
};

export function project (state = initialState, action) {
   
    switch (action.type) {
        case projectLabels.LOAD:
            return {
                ...state,
                isLoading: true
            };

        case projectLabels.LOAD_PROJECT:
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
                lists:action.payload,
                isLoading: false
            };

        case projectLabels.CREATE_LIST:
            let newList = action.payload
            newList.CardListFks = []
            let lists = [...state.lists,newList]
             
            socket.emit("updateLists", {projectId:lists[0].projectId,lists:lists})
            return {
                ...state,
                lists 
            };

        case projectLabels.CREATE_LIST_ERROR:
            return {
                ...state,
                isLoading: false
            };

        case listLabels.CREATE_CARD:
            let listWithCard = Array.from(state.lists)
            let findList = listWithCard.find(list => list.listId === action.payload.listId)
            let findListIndex = listWithCard.findIndex(list => list.listId === action.payload.listId)
            let notarchivedCardsCreate = findList.CardListFks.filter(card => card.cardStatus === 0)
            let archivedCardsCreate = findList.CardListFks.filter(card => card.cardStatus === 1)
            let newCreatedCard = action.payload
            newCreatedCard.ActionCardFks = [] 
            newCreatedCard.AttachmentCardFks = [] 
            newCreatedCard.HaslabelCardFks = [] 
            newCreatedCard.MemberhascardCardFks = [] 
            newCreatedCard.TaskCardFks = [] 
            
            notarchivedCardsCreate.push(action.payload)
            findList.CardListFks = notarchivedCardsCreate.concat(archivedCardsCreate)
            listWithCard.splice(findListIndex,1)
            listWithCard.splice(findListIndex,0,findList)
            socket.emit("updateLists", {projectId:listWithCard[0].projectId,lists:listWithCard})
            return {
                ...state,
                lists : listWithCard,
                isLoading:false
            };

        case cardLabels.ADD_MEMBER_ON_CARD:
            let newMember = action.payload.newMember
            let listIndex = action.payload.listIndex
            let cardIndexx = action.payload.cardIndex
            let listsCards = Array.from(state.lists)

            let element = {Member: newMember}

            listsCards[listIndex].CardListFks[cardIndexx].MemberhascardCardFks.push(element)
            socket.emit("updateLists", {projectId:listsCards[0].projectId,lists:listsCards})

            let maj2 = state.maj
            if (maj2 === '') maj2 = ' '
            else maj2 = ''
            return {
                ...state,
                lists: listsCards,
                maj: maj2
            };

        case cardLabels.DELETE_MEMBER:
            let listIndex1 = action.payload.listIndex
            let cardIndex1 = action.payload.cardIndex
            let elementIndex = action.payload.elementIndex

            let listsCards1 = Array.from(state.lists)

            listsCards1[listIndex1].CardListFks[cardIndex1].MemberhascardCardFks.splice(elementIndex, 1)
            socket.emit("updateLists", {projectId:listsCards1[0].projectId,lists:listsCards1})

            let maj3 = state.maj
            if (maj3 === '') maj3 = ' '
            else maj3 = ''

            return {
                ...state,
                lists: listsCards1,
                maj: maj3
            };

        case cardLabels.CREATE_LINK_LABEL:
            let maj = state.maj
            if (maj === '') maj = ' '
            else maj = ''
            return {
                ...state,
                maj: maj
            }

        case cardLabels.DELETE_LINK_LABEL:
            let maj1 = state.maj
            if (maj1 === '') maj1 = ' '
            else maj1 = ''
            return {
                ...state,
                maj: maj1
            }

        case listLabels.UPDATE_CARD:   
            socket.emit("updateLists", {projectId:action.payload[0].projectId,lists:action.payload})
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
            socket.emit("updateLists", {projectId:allList[0].projectId,lists:allList})
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
            socket.emit("updateLists", {projectId:newLists[0].projectId,lists:newLists})
            return {
                ...state,
                lists: newLists
            };
        case listLabels.DELETE_LIST:

        const deletedListIndex = state.lists.findIndex(list => list.listId === action.payload )
        const projectId = state.lists.find(list => list.listId === action.payload ).projectId
        let newlists = Array.from(state.lists)
        newlists.splice(deletedListIndex,1)
        socket.emit("updateLists", {projectId:projectId,lists:newlists})    
            return {
                ...state,
                lists: newlists,
            };
        case projectLabels.GET_PROJECT_INFO:
        socket.emit("updateProject", {projectId:action.payload[0].projectId,info:action.payload[0]})  
            return {
                ...state,
                projectInfo: action.payload[0]
            };
        case projectLabels.UPDATE_PROJECT_INFO:
        return {
            ...state,
            projectInfo: action.payload
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
                maj: ''
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
            socket.emit("updateLists", {projectId:action.payload[0].projectId,lists:action.payload})
            return {
                ...state,
                lists : action.payload
            };

        case cardLabels.DELETE_CARD:

            let updatedLists = Array.from(state.lists)
            updatedLists[action.payload.listIndex].CardListFks.splice(action.payload.cardIndex, 1)
            socket.emit("updateLists", {projectId:updatedLists[0].projectId,lists:updatedLists}) 
            return {
                ...state,
                lists : updatedLists,
                isLoading: false
            };
       case cardLabels.ARCHIVE_CARD:
            //Copy array of list
            let archivedCards = Array.from(state.lists)
            // modify card status
            archivedCards[action.payload.listIndex].CardListFks[action.payload.cardIndex].cardStatus = 1
            // reorder archived and not archived card of the updated list in order to correspond to good index
            let notarchivedCardsArray = archivedCards[action.payload.listIndex].CardListFks.filter(card => card.cardStatus === 0)
            let archivedCardsArray = archivedCards[action.payload.listIndex].CardListFks.filter(card => card.cardStatus === 1)
            //concat both lists
            archivedCards[action.payload.listIndex].CardListFks = notarchivedCardsArray.concat(archivedCardsArray)
            socket.emit("updateLists", {projectId:archivedCards[0].projectId,lists:archivedCards}) 
            return {
                ...state,
                lists : archivedCards,
            };
            case listLabels.RESTORE_CARD:
            //Copy array of list
            let arrayOfList = Array.from(state.lists)

            //Find index of the list 
            let listWithCardIndex = arrayOfList.findIndex(list => list.listId === action.payload.listId)
            let cardIndex = arrayOfList[listWithCardIndex].CardListFks.findIndex(card => card.cardId === action.payload.cardId)

            // modify card status
            arrayOfList[listWithCardIndex].CardListFks[cardIndex].cardStatus = 0
            // reorder archived and not archived card of the updated list in order to correspond to good index
            let notarchivedCards = arrayOfList[listWithCardIndex].CardListFks.filter(card => card.cardStatus === 0)
            let archiveCards =  arrayOfList[listWithCardIndex].CardListFks.filter(card => card.cardStatus === 1)
            
            //concat both lists
            arrayOfList[listWithCardIndex].CardListFks = notarchivedCards.concat(archiveCards)
            socket.emit("updateLists", {projectId:arrayOfList[0].projectId,lists:arrayOfList})  
            return {
                ...state,
                lists : arrayOfList,
            };

        case listLabels.UPDATE_DATE_CARD:
            let listsOld = Array.from(state.lists)

            let listDueDateIndex = listsOld.findIndex(list => list.listId === action.payload.card.listId)

            let cardDueDateIndex = listsOld[listDueDateIndex].CardListFks.findIndex(card => card.cardId === action.payload.card.cardId)

            listsOld[listDueDateIndex].CardListFks[cardDueDateIndex].cardDateTarget =  action.payload.dueDate
            socket.emit("updateLists", {projectId:listsOld[0].projectId,lists:listsOld}) 
            return {
                ...state,
                lists : listsOld
            };
        case listLabels.UPDATE_DESCRIPTION_CARD:
            let oldLists = Array.from(state.lists)

            let listDescriptionIndex = oldLists.findIndex(list => list.listId === action.payload.card.listId)

            let cardDescriptionIndex = oldLists[listDescriptionIndex].CardListFks.findIndex(card => card.cardId === action.payload.card.cardId)

            oldLists[listDescriptionIndex].CardListFks[cardDescriptionIndex].cardDescription =  action.payload.description
            socket.emit("updateLists", {projectId:oldLists[0].projectId,lists:oldLists}) 
            return {
                ...state,
                lists : oldLists
            };
        case listLabels.UPDATE_TITLE_CARD:
            let listsArray = Array.from(state.lists)

            let listTitleIndex = listsArray.findIndex(list => list.listId === action.payload.card.listId)

            let cardTitleIndex = listsArray[listTitleIndex].CardListFks.findIndex(card => card.cardId === action.payload.card.cardId)

            listsArray[listTitleIndex].CardListFks[cardTitleIndex].cardTitle=  action.payload.title
            socket.emit("updateLists", {projectId:listsArray[0].projectId,lists:listsArray}) 
            return {
                ...state,
                lists : listsArray
            };       
            
        default:
            return state
    }
}