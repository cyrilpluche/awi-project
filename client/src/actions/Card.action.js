import _service from "../services";
import _helper from "../helpers";

const labels = {
    GET_CARD: 'GET_CARD',
    GET_CARD_ERROR: 'GET_CARD_ERROR',
    UPDATE_CARD: 'UPDATE_CARD',
    ERROR_UPDATE_CARD : 'ERROR_UPDATE_CARD',
    DELETE_CARD: 'DELETE_CARD',
    DELETE_CARD_ERROR: 'DELETE_CARD_ERROR',
    UPDATE_TASK: 'UPDATE_TASK',
    UPDATE_TASK_ERROR: 'UPDATE_TASK_ERROR',
    DELETE_TASK: 'DELETE_TASK',
    DELETE_TASK_ERROR: 'DELETE_TASK_ERROR',
    CREATE_TASK: 'CREATE_TASK',
    CREATE_TASK_ERROR: 'CREATE_TASK_ERROR',
    LOAD: "LOAD",
    GET_ALL_LABEL: 'GET_ALL_LABEL'
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
                console.log("passé dans l'erreur")
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

function deleteCard(cardId) {
    return dispatch => _service.Card.delete({cardId: cardId})
        .then(isDeleted => {
            if(isDeleted){
                dispatch({
                    type: labels.DELETE_CARD,
                    payload: '' //TODO handle payload if deleted
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

export const cardAction = {
    labels,
    getCard,
    updatecard,
    updateTask,
    deleteCard,
    deleteTask,
    createTask,
    getLabels
}