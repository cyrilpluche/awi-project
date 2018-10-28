const labels = {
    CHANGE_NOTIFICATION_READ_STATE: 'CHANGE_NOTIFICATION_READ_STATE'
}

function handleReadCheckbox(notificationlist) {
    return (dispatch) => {
        dispatch({
            type: labels.CHANGE_NOTIFICATION_READ_STATE,
            payload: notificationlist
        });
    };
}

export const notificationAction = {
    labels,
    handleReadCheckbox
}