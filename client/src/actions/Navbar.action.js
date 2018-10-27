import _helper from '../helpers';
import _service from "../services";

const labels = {
    LOG_OFF : "LOG_OFF",
    GET_ALL_NOTIFICATIONS: "GET_ALL_NOTIFICATIONS",
    GET_ALL_NOTIFICATIONS_ERROR: "GET_ALL_NOTIFICATIONS_ERROR"
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

function getAllNotifications () {
    return dispatch => {
        _service.Action.getAll()
            .then(res => {
                dispatch({
                    type: labels.GET_ALL_NOTIFICATIONS,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.GET_ALL_NOTIFICATIONS_ERROR
                })
            });
    }
}

export const navbarAction = {
    labels,
    logOff,
    getAllNotifications
}