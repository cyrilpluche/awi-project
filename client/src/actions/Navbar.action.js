import _service from '../services'
import _helper from '../helpers';

const labels = {
    LOG_OFF : "LOG_OFF"
}

function logOff () {
    localStorage.removeItem('memberToken')
    _helper.History.push('/')
    return dispatch => {
        dispatch({
            type: labels.LOG_OFF
        });
    }
}

export const navbarAction = {
    labels,
    logOff
}