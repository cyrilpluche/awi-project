import _service from '../services'

const labels = {
    GET_ALL_CARDS :"GET_ALL_CARDS",
    CREATE_CARD:"CREATE_CARD",
    UPDATE_LIST_TITLE:"UPDATE_LIST_TITLE",
    DELETE_LIST:"DELETE_LIST",
    UPDATE_CARD: "UPDATE_CARD",
    UPDATE_LIST_STATUS: "UPDATE_LIST_STATUS",
    UPDATE_POSITION_LISTS:"UPDATE_POSITION_LISTS",
    LOAD_PROJECT:"LOAD_PROJECT"
}


function createCard(cardTitle,listId,projectId) {

    const body = {
        cardTitle: cardTitle,
        cardStatus : 0,
        listId: listId,
        cardDescription: ''
    }
    return dispatch => {
        dispatch({ type: labels.LOAD_PROJECT })
        _service.Card.create(body)
        .then(res => {
               const card = {
                   ...res,
                   CardListFks : []
               }
                dispatch({
                    type: labels.CREATE_CARD,
                    payload: card
                });
            })
        .catch((err) => {
            dispatch(err)
        });
    }
}

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
            dispatch(err)
        });
    }
}

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
                dispatch(err)
        });
    }
}

// function updateListTitle(newListTitle, listId){
//     const body = {
//         listTitle : newListTitle
//     }
//     return dispatch => {
//         _service.List.update(listId,body)
//             .then(res => {
//                 _service.List.get({listId: listId})
//                     .then(res => {
//                         console.log("res: ",res)
//                         dispatch({
//                             type: labels.UPDATE_LIST,
//                             payload: res.listTitle
//                         });
//                     })
//                     .catch((err) => {
//                         dispatch(err)
//                     });
//             })
//             .catch((err) => {
//                 dispatch(err)
//             });
//     }
// }

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
                dispatch(err)
            });
    }
}

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
                dispatch(err)
            });
    }
}

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
                dispatch(err)
            });
    } 
}

function updatePositionLists(newOrderedArray){
    return dispatch => {
            dispatch({
                type: labels.UPDATE_POSITION_LISTS,
                payload: newOrderedArray
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
    updatePositionLists
}

