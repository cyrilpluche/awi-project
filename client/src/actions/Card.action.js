import _service from "../services";

const labels = {
    GET_CARD: 'GET_CARD',
    GET_CARD_ERROR: 'GET_CARD_ERROR',
    UPDATE_CARD: 'UPDATE_CARD',
    UPDATE_POSITION_CARD : "UPDATE_POSITION_CARD",
    ERROR_UPDATE_CARD : 'ERROR_UPDATE_CARD',
    DELETE_CARD: 'DELETE_CARD',
    DELETE_CARD_ERROR: 'DELETE_CARD_ERROR',
    ADD_MEMBER_ON_CARD: "ADD_MEMBER_ON_CARD",
    ADD_MEMBER_ON_CARD_ERROR: "ADD_MEMBER_ON_CARD_ERROR",
    DELETE_MEMBER: "DELETE_MEMBER",
    DELETE_MEMBER_ERROR: "DELETE_MEMBER_ERROR",
    UPDATE_TASK: 'UPDATE_TASK',
    UPDATE_TASK_ERROR: 'UPDATE_TASK_ERROR',
    DELETE_TASK: 'DELETE_TASK',
    DELETE_TASK_ERROR: 'DELETE_TASK_ERROR',
    CREATE_TASK: 'CREATE_TASK',
    CREATE_TASK_ERROR: 'CREATE_TASK_ERROR',
    LOAD_CARD: "LOAD_CARD",
    GET_ALL_LABEL: 'GET_ALL_LABEL',
    GET_ALL_LABEL_ERROR:"GET_ALL_LABEL_ERROR",
    CREATE_LINK_LABEL: 'CREATE_LINK_LABEL',
    CREATE_LINK_LABEL_ERROR: 'CREATE_LINK_LABEL_ERROR',
    DELETE_LINK_LABEL: 'CREATE_LINK_LABEL',
    DELETE_LINK_LABEL_ERROR: 'CREATE_LINK_LABEL_ERROR',
    LOAD_PROJECT: "LOAD_PROJECT",
    ARCHIVE_CARD:"ARCHIVE_CARD",
    FIND_ALL_MEMBERS_ON_CARD: "FIND_ALL_MEMBERS_ON_CARD",
    FIND_ALL_MEMBERS_ON_CARD_ERROR: "FIND_ALL_MEMBERS_ON_CARD_ERROR",
    FIND_ALL_COMMENTS_ON_CARD: 'FIND_ALL_COMMENTS_ON_CARD',
    ADD_COMMENTS_ON_CARD: 'ADD_COMMENTS_ON_CARD'
}

/** Get a card
 * @param cardId card Id
 */
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
                dispatch({
                    type: labels.GET_CARD_ERROR,
                });
            });
    }
}

/** Get labels of a specific project
 * @param projectId  project id
 */
function getLabels(projectId) {
    return dispatch => {
        _service.Label.getAll({ projectId: projectId })
            .then(res => {
                dispatch({
                    type: labels.GET_ALL_LABEL,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.GET_ALL_LABEL_ERROR,
                });
            });
    }
}

/**Update a card
 * @param card card to update
 * @param body object containing information to update with
 * @param listIndex index of the list containing this card
 * @param cardIndex index of the card in the list
 */
function updatecard(card, body,listIndex, cardIndex) {


    return dispatch => _service.Card.update(card.cardId, body)
        .then(id => {
            dispatch({
                type : labels.ARCHIVE_CARD,
                payload: {
                    listIndex: listIndex,
                    cardIndex: cardIndex
                }
            })
        })
        .catch (e => {
            dispatch({
                type: labels.ERROR_UPDATE_CARD,
                errorMsg: 'impossible to execute this action'
            })
        })
};

/**Update a task
 * @param taskId task id
 * @param body Object containing updates
 */
function updateTask(taskId, body) {
    return dispatch => _service.Task.update({taskId: taskId}, body)
        .then(isUpdated => {
            if(isUpdated){
                dispatch({
                    type: labels.UPDATE_TASK
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

/** Delete a task
 * @param taskId task Id
 * @param card card containing task
 */
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

/**Delete a card
 * @param cardId card Id
 * @param listIndex list index that contains the card
 * @param cardIndex card index under the list
 */
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

/** Get all member affected to a card
 * @param cardId card Id
 * @param projectId project Id 
 */
function getMembersOnCard (cardId, projectId) {
    return dispatch => {
        dispatch({type: labels.LOAD_CARD})
        _service.Card.findAllMembers({
            cardId: cardId,
            projectId: projectId,
            memberhasprojectStatus: 1
        })
            .then(members => {
                dispatch({
                    type: labels.FIND_ALL_MEMBERS_ON_CARD,
                    payload: {
                        membersOnCard: members.membersOnCard,
                        membersOffCard: members.membersOffCard
                    }
                })
            })
            .catch (e => {
                dispatch({
                    type: labels.FIND_ALL_MEMBERS_ON_CARD_ERROR
                })
            })
    }
}

/** Add a member to a card
 * @param memberId
 * @param cardId
 * @param membersOnCard
 * @param membersOffCard
 * @param listIndex
 * @param cardIndex
 * @param member
 */
function addMember(memberId, cardId, membersOnCard, membersOffCard, listIndex, cardIndex, member) {
    let body = {
        cardId: cardId,
        memberId: memberId
    }
    return dispatch => {
        dispatch({ type: labels.LOAD_CARD })

        _service.Card.addMember(body)
            .then(mhc => {
                dispatch({
                    type: labels.ADD_MEMBER_ON_CARD,
                    payload: {
                        membersOnCard: membersOnCard,
                        membersOffCard: membersOffCard,
                        newMember: member,
                        cardIndex: cardIndex,
                        listIndex: listIndex
                    }
                })
            })
            .catch (e => {
                dispatch({
                    type: labels.ADD_MEMBER_ON_CARD_ERROR
                })
            })
    }
};

/** Remove a member from a card
 * @param memberId
 * @param cardId
 * @param membersOnCard
 * @param membersOffCard
 */
function removeMember (memberId, cardId, membersOnCard, membersOffCard, listIndex, cardIndex, elementIndex) {

    let query = {
        cardId: cardId,
        memberId: memberId
    }
    return dispatch => {
        dispatch({ type: labels.LOAD_CARD })

        _service.Card.removeMember(query)
            .then(isDeleted => {
                if (isDeleted) {
                    dispatch({
                        type: labels.DELETE_MEMBER,
                        payload: {
                            membersOnCard: membersOnCard,
                            membersOffCard: membersOffCard,
                            listIndex: listIndex,
                            cardIndex: cardIndex,
                            elementIndex: elementIndex
                        }
                    })
                } else {
                    dispatch({
                        type: labels.DELETE_MEMBER_ERROR
                    })
                }
            })
            .catch (e => {
                dispatch({
                    type: labels.DELETE_MEMBER_ERROR
                })
            })
    }
};

/**Create a new task
 * @param newTask new task name
 * @param card card that contains the task
 */
function createTask(newTask, card) {
    return dispatch => {
        dispatch({
            type: labels.LOAD_CARD
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

/** Create label link with a card
 * @param query Object that contains cardId and labelId
 */
function createLinkLabel(query) {
    return dispatch => {
        //{cardId: 1, labelId :1}
        _service.Card.createLinkLabel(query)
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

/** Delete a label link with a card
 * @param query Object that contains cardId and labelId
 */
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

/** Find all comment of a card
 * @param cardId card Id
 */
function findAllComments(cardId) {
    return dispatch => _service.Comments.getAllComments(cardId).then(comments => dispatch({
        type: labels.FIND_ALL_COMMENTS_ON_CARD,
        payload: comments
    }))
}

/** Add comments to a card
 * @param cardId card Id
 * @param memberId member id
 * @param text comment text
 */
function addComments (cardId, memberId, text) {
    return dispatch => _service.Comments.addComments().then(comment => {
        // TODO trigger notification
        dispatch({
            type: labels.ADD_COMMENTS_ON_CARD,
            payload: comment
        })
    })
}

/**Update position of cards
 * @param cards an array of cards
 */
function updatePositionCard (cards) {
    return dispatch => {
        _service.Card.updateCardOrder(cards)
            .then(res => {
                dispatch({
                    type: labels.UPDATE_POSITION_CARD
                })
            })
    }
}

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
    deleteLinkLabel,
    getMembersOnCard,
    findAllComments,
    addComments,
    updatePositionCard
}