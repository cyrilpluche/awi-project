import _service from '../services'

const labels = {
    MEMBER_EXIST: 'MEMBER_EXIST',
    MEMBER_NOT_EXIST: 'MEMBER_NOT_EXIST',
    DECRYPT_ERROR: 'DECRYPT_ERROR'
}

function isMemberExist (memberToken) {
    return (dispatch) => {
        _service.Member.decrpytInvitation(memberToken)
            .then(res => {
                if (res.isExist) {
                    dispatch({
                        type: labels.MEMBER_EXIST,
                        payload: {
                            informations: res,
                            isAccountValid: res.memberStatus !== 0
                        }
                    })
                } else {
                    dispatch({
                        type: labels.MEMBER_NOT_EXIST,
                        payload: {
                            informations: res,
                            isAccountExist: false,
                            isAccountValid: false
                        }
                    })
                }

            })
            .catch((err) => {
                dispatch({
                    type: labels.DECRYPT_ERROR
                })
            });
    };
}

export const invitationAction = {
    labels,
    isMemberExist
}