import _service from "../services";
import _helper from "../helpers";

const labels = {
    GET_CARD: 'GET_CARD',
    GET_CARD_ERROR: 'GET_CARD_ERROR',
    UPDATE_CARD: 'UPDATE_CARD',
    ERROR_UPDATE_CARD : 'ERROR_UPDATE_CARD',
    DELETE_CARD: 'DELETE_CARD',
    DELETE_CARD_ERROR: 'DELETE_CARD_ERROR',
    ADD_MEMBER: "ADD_MEMBER",
    ADD_MEMBER_ERROR: "ADD_MEMBER_ERROR",
    DELETE_MEMBER: "DELETE_MEMBER",
    DELETE_MEMBER_ERROR: "DELETE_MEMBER_ERROR",
    UPDATE_TASK: 'UPDATE_TASK',
    UPDATE_TASK_ERROR: 'UPDATE_TASK_ERROR',
    DELETE_TASK: 'DELETE_TASK',
    DELETE_TASK_ERROR: 'DELETE_TASK_ERROR',
    CREATE_TASK: 'CREATE_TASK',
    CREATE_TASK_ERROR: 'CREATE_TASK_ERROR',
    LOAD: "LOAD",
    GET_ALL_LABEL: 'GET_ALL_LABEL',
    CREATE_LINK_LABEL: 'CREATE_LINK_LABEL',
    CREATE_LINK_LABEL_ERROR: 'CREATE_LINK_LABEL_ERROR',
    DELETE_LINK_LABEL: 'CREATE_LINK_LABEL',
    DELETE_LINK_LABEL_ERROR: 'CREATE_LINK_LABEL_ERROR'
    LOAD_PROJECT: "LOAD_PROJECT",
}

function getCard(cardId) {
    return dispatch => {
        _service.Card.get({cardId: cardId})
            .then(res => {
                dispatch({
                    type: labels.GET_CARD,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch(err)
            });
    }
}

function getLabels() {
    return dispatch => {
        _service.Label.getAll()
            .then(res => {
                dispatch({
                    type: labels.GET_ALL_LABEL,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch(err)
            });
    }
}


function updatecard(card, body) {
    return dispatch => _service.Card.update(card.cardId,body)
        .then(id => {
            dispatch({
                card
            })
        })
        .catch (e => {
            dispatch({
                type: labels.ERROR_UPDATE_CARD,
                errorMsg: 'impossible to execute this action'
            })
        })
};


function updateTask(card, taskId, body) {
    return dispatch => _service.Task.update({taskId: taskId}, body)
        .then(isUpdated => {
            if(isUpdated){
                dispatch({
                    type: labels.UPDATE_TASK,
                    payload: card
                })
            }else{
                dispatch({
                    type: labels.UPDATE_TASK_ERROR
                })
            }
        })
        .catch (e => {
            dispatch({
                type: labels.UPDATE_TASK_ERROR
            })
        })
};


function deleteTask(taskId, card) {
    return dispatch => _service.Task.delete({taskId: taskId})
        .then(isDeleted => {
            if(isDeleted){
                dispatch({
                    type: labels.DELETE_TASK,
                    payload: card
                })
            }else{
                dispatch({
                    type: labels.DELETE_TASK_ERROR
                })
            }
        })
        .catch (e => {
            dispatch({
                type: labels.DELETE_TASK_ERROR
            })
        })
};

function deleteCard(cardId, listIndex, cardIndex) {
    return dispatch => {
        dispatch({ type: labels.LOAD_PROJECT })
        _service.Card.delete({cardId: cardId})
            .then(isDeleted => {
                if(isDeleted){
                    dispatch({
                        type: labels.DELETE_CARD,
                        payload: {
                            listIndex: listIndex,
                            cardIndex: cardIndex
                        }
                    })
                }else{
                    dispatch({
                        type: labels.DELETE_CARD_ERROR
                    })
                }
            })
            .catch (e => {
                dispatch({
                    type: labels.DELETE_CARD_ERROR
                })
            })
    }
};

function addMember(cardId, memberId, membersOnCard, membersOffCard) {
    let body = {
        cardId: cardId,
        memberId: memberId
    }
    return dispatch => _service.Card.addMember(body)
        .then(mhc => {
            dispatch({
                type: labels.ADD_MEMBER,
                payload: {
                    membersOnCard: membersOnCard,
                    membersOffCard: membersOffCard
                }
            })
        })
        .catch (e => {
            dispatch({
                type: labels.ADD_MEMBER_ERROR
            })
        })
};

function removeMember (cardId, memberId, membersOnCard, membersOffCard) {
    let query = {
        cardId: cardId,
        memberId: memberId
    }
    return dispatch => _service.Card.removeMember(query)
        .then(isDeleted => {
            if (isDeleted) {
                dispatch({
                    type: labels.DELETE_CARD,
                    payload: {
                        membersOnCard: membersOnCard,
                        membersOffCard: membersOffCard
                    }
                })
            } else {
                dispatch({
                    type: labels.DELETE_CARD_ERROR
                })
            }
        })
        .catch (e => {
            dispatch({
                type: labels.DELETE_CARD_ERROR
            })
        })
};

function createTask(newTask, card) {
    return dispatch => {
        dispatch({
            type: labels.LOAD
        })
        _service.Task.create(newTask)
            .then(res => {
                card.TaskCardFks.push(res)
                dispatch({
                    type: labels.CREATE_TASK,
                    payload : card
                })
            }).catch (e => {
            dispatch({
                type: labels.CREATE_TASK_ERROR
            })
        })
    }
};

function createLinkLabel(query) {
    return dispatch => {
        _service.card.createLinkLabel(query)
            .then(res => {
                dispatch({
                    type: labels.CREATE_LINK_LABEL
                })
            }).catch (e => {
            dispatch({
                type: labels.CREATE_LINK_LABEL_ERROR
            })
        })
    }
};

function deleteLinkLabel(query) {
    return dispatch => _service.Card.deleteLinkLabel(query)
        .then(isDeleted => {
            if (isDeleted) {
                dispatch({
                    type: labels.DELETE_LINK_LABEL,
                })
            } else {
                dispatch({
                    type: labels.DELETE_LINK_LABEL_ERROR
                })
            }
        })
        .catch (e => {
            dispatch({
                type: labels.DELETE_LINK_LABEL_ERROR
            })
        })
};

export const cardAction = {
    labels,
    getCard,
    updatecard,
    updateTask,
    deleteCard,
    deleteTask,
    createTask,
    getLabels,
    addMember,
    removeMember,
    createLinkLabel,
    deleteLinkLabel
}