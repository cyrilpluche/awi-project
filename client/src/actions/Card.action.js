import _service from "../services";

const labels = {
    UPDATE_CARD: 'UPDATE_CARD',
    DELETE_CARD: 'DELETE_CARD',
    ERROR_UPDATE_CARD : 'ERROR_UPDATE_CARD',
    DELETE_CARD_ERROR: 'DELETE_CARD_ERROR'
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
    updatecard,
    deleteCard
}