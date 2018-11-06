import _service from "../services";

const labels = {
    GET_CARD: 'GET_CARD',
    UPDATE_CARD: 'UPDATE_CARD',
    DELETE_CARD: 'DELETE_CARD',
    GET_CARD_ERROR: 'GET_CARD_ERROR',
    ERROR_UPDATE_CARD : 'ERROR_UPDATE_CARD',
    DELETE_CARD_ERROR: 'DELETE_CARD_ERROR'
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

function deleteCard(cardId) {
    return dispatch => _service.Card.delete({cardId: cardId})
        .then(isDeleted => {
            if(isDeleted){
                dispatch({
                    type: labels.DELETE_CARD
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

export const cardAction = {
    labels,
    getCard,
    updatecard,
    deleteCard
}