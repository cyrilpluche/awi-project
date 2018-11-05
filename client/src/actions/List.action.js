import _service from '../services'

const labels = {
    GET_ALL_CARDS :"GET_ALL_CARDS",
    CREATE_CARD:"CREATE_CARD",
    UPDATE_LIST:"UPDATE_LIST",
    DELETE_LIST:"DELETE_LIST"
}


function createCard(cardTitle,listId) {

    const body = {
        cardTitle: cardTitle,
        cardStatus : 0,
        listId: listId
    }
    return dispatch => {
        _service.Card.create(body)
        .then(res => {
            dispatch({
                type: labels.CREATE_CARD,
                payload: res
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

function updateCard(cardId, listId){
    const body={
        listId : listId
    }
    console.log(cardId)
    console.log(listId)
    return dispatch => {
        _service.Card.update(cardId,body)
        .then(res => {
            _service.Card.getAll()
            .then(resFinal => {
                dispatch({
                    type: labels.GET_ALL_CARDS,
                    payload: resFinal
                });
            })
            .catch((err) => {
                dispatch(err)
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

function updateListTitle(newListTitle, listId, projectId){
    const body = {
        listTitle : newListTitle
    }
    return dispatch => {
        _service.List.update(listId,body)
            .then(res => {
                _service.List.getAll(projectId)
                    .then(res => {
                        dispatch({
                            type: labels.UPDATE_LIST,
                            payload: res
                        });
                    })
                    .catch((err) => {
                        dispatch(err)
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
                _service.List.getAll(projectId)
                    .then(res => {
                        dispatch({
                            type: labels.DELETE_LIST,
                            payload: res
                        });
                    })
                    .catch((err) => {
                        dispatch(err)
                    });
            })
            .catch((err) => {
                dispatch(err)
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
}

