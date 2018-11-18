import _service from '../services'

const labels = {
    SEARCH_PROJECTS :"SEARCH_PROJECTS",
    SEARCH_PROJECTS_ERROR :"SEARCH_PROJECTS_ERROR",
    SEARCH_CARDS :"SEARCH_CARDS",
    SEARCH_CARDS_ERROR :"SEARCH_CARDS_ERROR",
    SEARCH_LISTS :"SEARCH_LISTS",
    SEARCH_LISTS_ERROR :"SEARCH_LISTS_ERROR",
    SEARCH_RESET: "SEARCH_RESET"
}

/** Search for projects
 * @param value name to search
 * @param memberId member id
 */
function searchProjects (value, memberId) {
    return dispatch => {
        if (value !== '') {
            _service.Project.searchbarProjects({str: value, memberId: memberId})
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

/** Search for lists
 * @param value name to search
 * @param memberId member id
 */
function searchLists (value, memberId) {
    return dispatch => {
        if (value !== '') {
            _service.List.searchbarLists({str: value, memberId: memberId})
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

/** Search for cards
 * @param value name to search
 * @param memberId member id 
 */
function searchCards (value, memberId) {
    return dispatch => {
        if (value !== '') {
            _service.Card.searchbarCards({str: value, memberId: memberId})
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

function resetSearchArrays () {
    return dispatch => {
        dispatch({
            type: labels.SEARCH_RESET
        });
    }
}

export const searchbarAction = {
    labels,
    searchProjects,
    searchLists,
    searchCards,
    resetSearchArrays
}

