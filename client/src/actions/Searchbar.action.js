import _service from '../services'

const labels = {
    SEARCH_PROJECTS :"SEARCH_PROJECTS",
    SEARCH_PROJECTS_ERROR :"SEARCH_PROJECTS_ERROR",
    SEARCH_CARDS :"SEARCH_CARDS",
    SEARCH_CARDS_ERROR :"SEARCH_CARDS_ERROR",
    SEARCH_LISTS :"SEARCH_LISTS",
    SEARCH_LISTS_ERROR :"SEARCH_LISTS_ERROR"
}


function searchProjects (value) {
    return dispatch => {
        if (value !== '') {
            _service.Project.searchbarProjects({str: value})
                .then(res => {
                    dispatch({
                        type: labels.SEARCH_PROJECTS,
                        payload: res
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: labels.SEARCH_PROJECTS_ERROR
                    });
                });
        } else {
            dispatch({
                type: labels.SEARCH_PROJECTS,
                payload: []
            });
        }
    }
}

function searchLists (value) {
    return dispatch => {
        if (value !== '') {
            _service.List.searchbarLists({str: value})
                .then(res => {
                    dispatch({
                        type: labels.SEARCH_LISTS,
                        payload: res
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: labels.SEARCH_LISTS_ERROR
                    });
                });
        } else {
            dispatch({
                type: labels.SEARCH_LISTS,
                payload: []
            });
        }
    }
}

function searchCards (value) {
    return dispatch => {
        if (value !== '') {
            _service.Card.searchbarCards({str: value})
                .then(res => {
                    dispatch({
                        type: labels.SEARCH_CARDS,
                        payload: res
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: labels.SEARCH_CARDS_ERROR
                    });
                });
        } else {
            dispatch({
                type: labels.SEARCH_CARDS,
                payload: []
            });
        }
    }
}

export const searchbarAction = {
    labels,
    searchProjects,
    searchLists,
    searchCards
}
