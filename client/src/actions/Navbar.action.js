import _helper from '../helpers';
import _service from "../services";

const labels = {
    LOG_OFF : "LOG_OFF",
    GET_ALL_NOTIFICATIONS: "GET_ALL_NOTIFICATIONS",
    GET_ALL_NOTIFICATIONS_ERROR: "GET_ALL_NOTIFICATIONS_ERROR",
    UPDATE_NOTIFICATION: "UPDATE_NOTIFICATION",
    UPDATE_NOTIFICATIONS__DB_ERROR: "UPDATE_NOTIFICATIONS_DB_ERROR",
    UPDATE_NOTIFICATIONS_DB: "UPDATE_NOTIFICATIONS_DB",

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

/* =============== NOTIFICATIONS =============== */
function getAllNonArchivedNotifications () {
    return dispatch => {
        _service.Action.getNonArchived()
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

/** Change the state of the checkbox locally */
function handleCheckboxNotification (notifications, newNotification, index, isRead, nbUnread) {
    return dispatch => {
        var res;
        notifications[index] = newNotification
        if (isRead) {
            res = {
                notifications: notifications,
                notificationsUnread: nbUnread -= 1
            }
        } else {
            res = {
                notifications: notifications,
                notificationsUnread: nbUnread += 1
            }
        }
        dispatch({
            type: labels.UPDATE_NOTIFICATION,
            payload: res
        });
    }
}

function updateNotifications (notifications) {
    return dispatch => {
        _service.Action.updateMultiple(notifications)
            .then(res => {
                dispatch({
                    type: labels.UPDATE_NOTIFICATIONS_DB,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.UPDATE_NOTIFICATIONS__DB_ERROR
                })
            });
    }
}

export const navbarAction = {
    labels,
    logOff,
    getAllNonArchivedNotifications,
    handleCheckboxNotification,
    updateNotifications
}