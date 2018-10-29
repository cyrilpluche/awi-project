import _service from '../services'

const labels = {
    GET_ALL_CARDS :"GET_ALL_CARDS",
    CREATE_CARD:"CREATE_CARD"
}

/**
 * Get all list of a project
 * @param idProject project id to search lists for
 */
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

export const listAction = {
    labels,
    createCard,
}

