import _service from "../services";

const labels = {
    UPDATE_CARD: 'UPDATE_CARD',
    ERROR_UPDATE_CARD : 'ERROR_UPDATE_CARD'
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

export const updateCardAction = {
    labels,
    updatecard
}