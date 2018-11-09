import _service from '../services'
import _helper from '../helpers'
import moment from 'moment'

const labels = {
    MEMBER_EXIST: 'MEMBER_EXIST',
    MEMBER_NOT_EXIST: 'MEMBER_NOT_EXIST',
    DECRYPT_ERROR: 'DECRYPT_ERROR',
    INVITATION_REPLY: 'INVITATION_REPLY',
    INVITATION_REPLY_ERROR: 'INVITATION_REPLY_ERROR'
}

function isMemberExist (memberToken) {
    return (dispatch) => {
        _service.Member.decrpytInvitation(memberToken)
            .then(res => {
                if (res.isExist) {
                    _service.Member.getInvitation({ projectId: res.projectId, memberId: res.memberId, memberhasprojectStatus: 0 })
                        .then(memberProject => {
                            if (memberProject) {
                                dispatch({
                                    type: labels.MEMBER_EXIST,
                                    payload: {
                                        member: memberProject.Member,
                                        project: memberProject.Project,
                                        isAccountValid: res.memberStatus === 1
                                    }
                                })
                            } else {
                                _helper.History.push('/home')
                                dispatch({
                                    type: labels.DECRYPT_ERROR
                                })
                            }
                        })
                        .catch((err) => {
                           dispatch({
                                type: labels.DECRYPT_ERROR
                            })
                        });
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
                _helper.History.push('/home')
                dispatch({
                    type: labels.DECRYPT_ERROR
                })
            });
    };
}

function replyToInvitation (accept, body, query, member) {
    return (dispatch) => {
        if (accept) {
            _service.Member.updateInvitation(body, query)
                .then(isUpdated => {
                    if (isUpdated) {
                        _service.Permission.createMemberProjectPermission(member.memberId, query.projectId, 3, true)
                            .then(res => {
                                dispatch({
                                    type: labels.INVITATION_REPLY
                                })
                            })
                        /*_service.Action.createActivityForAllMembers({
                            actionType: 2,
                            actionTitle: member.memberPseudo + ' has join the project',
                            actionDescription: member.memberPseudo + ' has accept the invitation.',
                            memberId: query.memberId,
                            projectId: query.projectId,
                            actionDateCreation: moment(),
                            mhaStatus: 0
                        })*/
                        _helper.History.push('/home')
                    } else {
                        dispatch({
                            type: labels.INVITATION_REPLY_ERROR
                        })
                    }

                })
                .catch((err) => {
                    dispatch({
                        type: labels.INVITATION_REPLY_ERROR
                    })
                });
        } else {
            _service.Member.deleteInvitation(query)
                .then(isDeleted => {
                    if (isDeleted) {
                        dispatch({
                            type: labels.INVITATION_REPLY
                        })
                        _helper.History.push('/home')
                    } else {
                        dispatch({
                            type: labels.INVITATION_REPLY_ERROR
                        })
                    }

                })
                .catch((err) => {
                    dispatch({
                        type: labels.INVITATION_REPLY_ERROR
                    })
                });
        }
    }
}

export const invitationAction = {
    labels,
    isMemberExist,
    replyToInvitation
}