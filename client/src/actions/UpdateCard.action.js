const labels = {
    UPDATE_CARD: 'UPDATE_CARD'
}

function updatecard(newCard) {
    return (dispatch) => {
        dispatch({
            type : labels.UPDATE_CARD,
            payload : {
                id: newCard.id,
                title : newCard.title,
                deadline : newCard.deadline,
                description : newCard.description,
                labels : newCard.labels,
                members : newCard.members,
                comments : newCard.comments,
            }
        })
    };
}

export const updateCardAction = {
    labels,
    updatecard
}