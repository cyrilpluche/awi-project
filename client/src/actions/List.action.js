import _service from '../services'

const labels = {
    GET_ALL_CARDS :"GET_ALL_CARDS",
    CREATE_CARD:"CREATE_CARD"
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


export const listAction = {
    labels,
    createCard,
    findAllCards,
    updateCard
}

