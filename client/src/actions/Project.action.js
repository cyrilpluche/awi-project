import _service from '../services'

const labels = {
    GET_ALL_LISTS :"GET_ALL_LISTS",
}

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


export const projectAction = {
    labels,
    findAllLists
}