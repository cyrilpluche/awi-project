import _service from '../services'

const labels = {
    GET_ALL_LISTS :"GET_ALL_LISTS",
    CREATE_LIST : "CREATE_LIST"
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
    if(listFather !== null)
    {
        return dispatch => {
            _service.List.create(body)
            .then(res => { 
                const fatherBody = {
                    listId: listFather, 
                    listChild: res.listId 
                }
                _service.List.update(listFather,fatherBody)
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
            })
            .catch((err) => {
                dispatch(err)
            });
        }
    }else{
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
   
}



export const projectAction = {
    labels,
    findAllLists,
    createList
}