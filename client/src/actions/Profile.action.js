import _service from '../services'

const labels = {
    UPDATE_MEMBER: 'UPDATE_MEMBER',
    UPDATE_MEMBER_ERROR: 'UPDATE_MEMBER_ERROR',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    UPDATE_PASSWORD_ERROR: 'UPDATE_PASSWORD_ERROR'
}

function updateMember(attributes) {
    return (dispatch) => {
        _service.Member.update(attributes)
            .then(res => {
                if (res) {
                    localStorage.setItem('memberToken', res.memberToken)
                    console.log(res)

                    dispatch({
                        type: labels.UPDATE_MEMBER,
                        payload: {
                            member: res
                        }
                    })
                } else {
                    dispatch({
                        type: labels.UPDATE_MEMBER_ERROR,
                    })
                }

            })
            .catch((err) => {
                dispatch({
                    type: labels.UPDATE_MEMBER_ERROR,
                })
            });
    };
}

function updateMemberPassword (passwords) {
    return (dispatch) => {
        _service.Member.updatePassword(passwords)
            .then(res => {
                if (res) {
                    localStorage.setItem('memberToken', res.memberToken)
                    dispatch({
                        type: labels.UPDATE_PASSWORD,
                        payload: {
                            updatePasswordMsg: 'Password updated.',
                        }
                    })
                } else {
                    dispatch({
                        type: labels.UPDATE_PASSWORD_ERROR,
                        payload: {
                            updatePasswordMsg: 'Wrong password. Please, provide the right password for your account.',
                        }
                    })
                }

            })
            .catch((err) => {
                dispatch({
                    type: labels.UPDATE_PASSWORD_ERROR,
                    payload: {
                        updatePasswordMsg: 'Wrong password. Please, provide the right password for your account.',
                    }
                })
            });
    }
}

export const profileAction = {
    labels,
    updateMember,
    updateMemberPassword
}