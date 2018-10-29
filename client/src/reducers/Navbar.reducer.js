import { navbarAction } from '../actions/Navbar.action';
import { notificationAction } from '../actions/Notification.action';

const labels = navbarAction.labels;
const notificationLabels = notificationAction.labels

const initialState = {
    notifications: [],
    notificationsUnarchived: [],
    notificationsUnread: 0
};

export function navbar (state = initialState, action) {
    switch (action.type) {
        case labels.GET_ALL_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload.notifications,
                notificationsUnread: action.payload.notificationsUnread,
            };

        case labels.GET_ALL_NOTIFICATIONS_ERROR:
            return state;

        case labels.UPDATE_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload.notifications,
                notificationsUnread: action.payload.notificationsUnread
            };

        case notificationLabels.FILTER_ONLY_UNREAD:
            return {
                ...state,
                notifications: action.payload.notifications,
                notificationsUnarchived: action.payload.notificationsUnarchived
            };

        case notificationLabels.DISABLED_FILTER:
            return {
                ...state,
                notifications: action.payload.notifications,
                notificationsUnarchived: action.payload.notificationsUnarchived
            };

        default:
            return state
    }
};
