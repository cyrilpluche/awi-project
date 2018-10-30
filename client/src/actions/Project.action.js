import _service from '../services'

const labels = {
    GET_ALL_LISTS :"GET_ALL_LISTS",
    CREATE_LIST : "CREATE_LIST",
    UPDATE_LIST : "UPDATE_LIST"
}

/**
 * Get all list of a project
 * @param idProject project id to search lists for
 */
function findAllLists (idProject) {
    return dispatch => {
        _service.List.getAll(idProject)
        .then(res => {
            dispatch({
                type: labels.GET_ALL_LISTS,
                payload: res
            });
        })
        .catch((err) => {
            dispatch(err)
        });
    }
}

function createList (listTitle, projectId, listFather) {
    
    const body = {
        listTitle: listTitle,
        listStatus : 0,
        projectId: projectId,
        listFather:listFather
    }
        return dispatch => {
            _service.List.create(body)
            .then(res => { 
                     _service.List.getAll(projectId)
                    .then(resFinal => {
                        dispatch({
                            type: labels.GET_ALL_LISTS,
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


function updateLists (listId,fatherListId) {
    let body = {
        listFather : fatherListId
    }
    
    
    return dispatch => {
        //Update list dragged
        _service.List.update(listId,body)
            .then(res => { 
                dispatch({
                    type: labels.UPDATE_LIST,
                    payload: res
                });
            })
        .catch((err) => {
            dispatch(err)
        });
    }
}



export const projectAction = {
    labels,
    findAllLists,
    createList,
    updateLists
}