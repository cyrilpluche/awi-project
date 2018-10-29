import _service from '../services'

const labels = {
    UPDATE_MEMBER: 'UPDATE_MEMBER',
    UPDATE_MEMBER_ERROR: 'UPDATE_MEMBER_ERROR'
}

function updateMember(attributes) {
    return (dispatch) => {
        _service.Member.update(attributes)
            .then(res => {
                if (res) {
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

export const profileAction = {
    labels,
    updateMember
}