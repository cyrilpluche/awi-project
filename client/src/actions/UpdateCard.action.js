import _service from '../services'

const labels = {
    UPDATE_CARD: 'UPDATE_CARD'
}

function updatecard(attributes) {
    return (dispatch) => {
        dispatch({
            type : labels.UPDATE_CARD,
            payload : {cardInfo : "nouveau"}
        })
    };
}

export const updateCardAction = {
    labels,
    updatecard
}