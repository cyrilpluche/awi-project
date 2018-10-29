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
        _service.List.getAll()
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

function createList (listTitle, projectId) {
    const body = {
        listTitle: listTitle,
        listStatus : 0,
        projectId: projectId
    }
    return dispatch => {
        _service.List.create(body)
        .then(res => {
            dispatch({
                type: labels.CREATE_LIST,
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
    createList
}