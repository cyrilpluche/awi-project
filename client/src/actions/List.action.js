import _service from '../services'
import moment from "moment";

const labels = {
    GET_ALL_CARDS :"GET_ALL_CARDS",
    GET_ALL_CARDS_ERROR:"GET_ALL_CARDS_ERROR",
    CREATE_CARD:"CREATE_CARD",
    UPDATE_LIST_TITLE:"UPDATE_LIST_TITLE",
    UPDATE_LIST_TITLE_ERROR:"UPDATE_LIST_TITLE_ERROR",
    DELETE_LIST:"DELETE_LIST",
    DELETE_LIST_ERROR:"DELETE_LIST_ERROR",
    UPDATE_CARD: "UPDATE_CARD",
    UPDATE_CARD_ERROR:"UPDATE_CARD_ERROR",
    UPDATE_LIST_STATUS: "UPDATE_LIST_STATUS",
    UPDATE_LIST_STATUS_ERROR:"UPDATE_LIST_STATUS_ERROR",
    UPDATE_POSITION_LISTS:"UPDATE_POSITION_LISTS",
    LOAD_PROJECT:"LOAD_PROJECT",
    RESTORE_CARD:"RESTORE_CARD",
    RESTORE_CARD_ERROR:"RESTORE_CARD_ERROR",
    UPDATE_DATE_CARD:"UPDATE_DATE_CARD",
    UPDATE_DATE_CARD_ERROR:"UPDATE_DATE_CARD_ERROR",
    UPDATE_DESCRIPTION_CARD:"UPDATE_DESCRIPTION_CARD",
    UPDATE_DESCRIPTION_CARD_ERROR:"UPDATE_DESCRIPTION_CARD_ERROR",
    UPDATE_TITLE_CARD:"UPDATE_TITLE_CARD",
    UPDATE_TITLE_CARD_ERROR:"UPDATE_TITLE_CARD_ERROR",
    CREATE_CARD_ERROR: "CREATE_CARD_ERROR"

}

/** Create a new card
 * @param cardTitle new card title
 * @param listId list id linked to the new card
 * @param projectId project id linked to the new card
 * @param member member that created the card
 * @param cardFather card father to keep card order
 */
function createCard(cardTitle,listId,projectId, member, cardFather) {
    console.log(cardFather)
    const body = {
        cardTitle: cardTitle,
        cardStatus : 0,
        listId: listId,
        cardDescription: '',
        cardFather: cardFather
    }
    return dispatch => {
        dispatch({ type: labels.LOAD_PROJECT })
        _service.Card.create(body)
            .then(res => {
                const card = {
                    ...res,
                    CardListFks : []
                }
                _service.Action.createActivityForAllMembers({
                    actionType: 0,
                    actionTitle: "Card was created",
                    actionDescription: member.memberPseudo + " has create the card '" + cardTitle + "'.",
                    memberId: member.memberId,
                    projectId: projectId,
                    actionDateCreation: moment(),
                    mhaStatus: 0
                })
                dispatch({
                    type: labels.CREATE_CARD,
                    payload: card
                });
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: labels.CREATE_CARD_ERROR
                })
            });
    }
}

/** Find all cards
 * 
 */
function findAllCards() {

    return dispatch => {
        _service.Card.getAll()
            .then(res => {
                dispatch({
                    type: labels.GET_ALL_CARDS,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.GET_ALL_CARDS_ERROR
                })
            });
    }
}

/** Update a card
 * @param cardId card Id
 * @param listId list Id
 * @param newLists newLists
 */
function updateCard(cardId, listId, newLists){
    const body={
        listId : listId
    }
    return dispatch => {
        _service.Card.update(cardId,body)
            .then(res => {

                dispatch({
                    type: labels.UPDATE_CARD,
                    payload: newLists
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.UPDATE_CARD_ERROR
                })
            });
    }
}

/** Update due date of a card
 * @param card updated card
 * @param body object with data to update
 */
function updateDueDateCard(card, body){
    return dispatch =>{
        _service.Card.update(card.cardId, body)
            .then(res =>{
                    dispatch({
                        type: labels.UPDATE_DATE_CARD,
                        payload: {
                            card : card,
                            dueDate : body.cardDateTarget
                        }
                    });
                }
            ).catch(e => {
            dispatch({
                type: labels.UPDATE_DATE_CARD_ERROR
            })
        })
    }

}

/** Update description of a card
 * @param card card to update
 * @param body Object that contains data to update with
 */
function updateDescription(card, body){
    return dispatch =>{
        _service.Card.update(card.cardId, body)
            .then(res =>{
                    dispatch({
                        type: labels.UPDATE_DESCRIPTION_CARD,
                        payload: {
                            card : card,
                            description : body.cardDescription
                        }
                    });
                }
            ).catch(e => {
            dispatch({
                type: labels.UPDATE_DESCRIPTION_CARD_ERROR
            })
        })
    }
}

/** Update card title
 * @param card card to update title
 * @param body Object that contains new title
 */
function updateCardTitle(card, body){
    return dispatch =>{
        _service.Card.update(card.cardId, body)
            .then(res =>{
                    dispatch({
                        type: labels.UPDATE_TITLE_CARD,
                        payload: {
                            card : card,
                            title : body.cardTitle
                        }
                    });
                }
            ).catch(e => {
            dispatch({
                type: labels.UPDATE_TITLE_CARD_ERROR
            })
        })
    }
}


/** Update list Title
 * @param newListTitle new list title
 * @param listId list Id
 */
function updateListTitle(newListTitle, listId){
    const body = {
        listTitle : newListTitle,
        listId : listId
    }
    const setDispacth = {
        listTitle : newListTitle,
        listId : listId,
        newListTitle : newListTitle
    }

    return dispatch => {
        _service.List.update(listId,body)
            .then(res => {
                dispatch({
                    type: labels.UPDATE_LIST_TITLE,
                    payload: setDispacth
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.UPDATE_LIST_TITLE_ERROR,
                });
            });
    }
}

/** Delete a list from a project
 * @param listId list id
 * @param projectId project id
 */
function deleteList(listId, projectId) {


    return dispatch => {
        _service.List.delete(listId)
            .then(res => {
                dispatch({
                    type: labels.DELETE_LIST,
                    payload: listId
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.DELETE_LIST_ERROR,
                });
            });
    }
}

/** Update list status (archive)
 * @param listId list id
 * @param status status to update
 */
function updateListStatus(listId, status){
    const body ={
        listId:listId,
        listStatus:status
    }
    return dispatch => {
        _service.List.update(listId,body)
            .then(res => {
                dispatch({
                    type: labels.UPDATE_LIST_STATUS,
                    payload: body
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.UPDATE_LIST_STATUS_ERROR,
                });
            });
    }
}

/** Update position of lists
 * @param newOrderedArray array of ordered list
 * @param listOrder order of lists
 */
function updatePositionLists(newOrderedArray, listsOrder){
    return dispatch => {
        _service.List.updateListOrder(listsOrder)
        dispatch({
            type: labels.UPDATE_POSITION_LISTS,
            payload: newOrderedArray
        });
    }
}

/** Restore a card from archived
 * @param card card to restore
 * @param body information to update
 */
function restoreCard(card, body){
    return dispatch => {
        _service.Card.update(card.cardId,body)
            .then(res => {

                dispatch({
                    type: labels.RESTORE_CARD,
                    payload: card
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.RESTORE_CARD_ERROR,
                });
            });
    }
}


export const listAction = {
    labels,
    createCard,
    findAllCards,
    updateCard,
    updateListTitle,
    deleteList,
    updateListStatus,
    updatePositionLists,
    restoreCard,
    updateDueDateCard,
    updateDescription,
    updateCardTitle
}

