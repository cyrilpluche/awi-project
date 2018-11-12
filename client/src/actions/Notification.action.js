import cloneDeep from 'lodash/cloneDeep';

const labels = {
    CHANGE_NOTIFICATION_READ_STATE: 'CHANGE_NOTIFICATION_READ_STATE',
    FILTER_ONLY_UNREAD: 'FILTER_ONLY_UNREAD',
    DISABLED_FILTER: 'DISABLED_FILTER'
}

// WARNING : Don't work, problem with object copy I guess
function showOnlyUnreadAction (notifications, notificationsUnarchived, onlyUnread) {
    if (onlyUnread) {
        // We need to get only unread notifications in the store
        let notificationsUnarchived = []
        notificationsUnarchived = cloneDeep(notifications);
        //Object.assign(notificationsUnarchived, notifications)
        let newNotifications = []

        for (let item of notificationsUnarchived) {
            if (item.actionStatus === 0) {
                newNotifications.push(item)
            }
        }
        return (dispatch) => {
            dispatch({
                type: labels.FILTER_ONLY_UNREAD,
                payload: {
                    notifications: newNotifications,
                    notificationsUnarchived: notifications
                }
            });
        };
    } else {
        return (dispatch) => {
            dispatch({
                type: labels.DISABLED_FILTER,
                payload: {
                    notifications: notificationsUnarchived,
                    notificationsUnarchived: []
                }
            });
        }
    }
}

export const notificationAction = {
    labels,
    showOnlyUnreadAction
}