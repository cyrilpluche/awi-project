import _service from '../services'
import moment from "moment";

const labels = {
    GET_ALL_LISTS :"GET_ALL_LISTS",
    CREATE_LIST : "CREATE_LIST",
    UPDATE_LIST : "UPDATE_LIST",
    GET_PROJECT_INFO : "GET_PROJECT_INFO",
    GET_ALL_MEMBERS:"GET_ALL_MEMBERS",
    GET_ALL_MEMBERS_ERROR:"GET_ALL_MEMBERS_ERROR",
    INVITATION_SUCCESS: "INVITATION_SUCCESS",
    INVITATION_ERROR: "INVITATION_ERROR",
    GET_MEMBER_STATUS:"GET_MEMBER_STATUS",
    GET_MEMBER_STATUS_ERROR: "GET_MEMBER_STATUS_ERROR",
    REMOVE_MEMBER_FROM_PROJECT:"REMOVE_MEMBER_FROM_PROJECT",
    REMOVE_MEMBER_FROM_PROJECT_ERROR:"REMOVE_MEMBER_FROM_PROJECT_ERROR",
    SET_MEMBER_ADMIN : "SET_MEMBER_ADMIN",
    GET_ACTIVITY:"GET_ACTIVITY",
    GET_ACTIVITY_ERROR: "GET_ACTIVITY_ERROR",
    MEMBER_HAS_PROJECT:"MEMBER_HAS_PROJECT",
    LOAD: "LOAD",
    GET_ALL_PERMISSIONS: "GET_ALL_PERMISSIONS",
    GET_ALL_PERMISSIONS_ERROR: "GET_ALL_PERMISSIONS_ERROR",
    UPDATE_PERMISSION_MEMBER: "UPDATE_PERMISSION_MEMBER",
    UPDATE_PERMISSION_MEMBER_ERROR: "UPDATE_PERMISSION_MEMBER_ERROR"
}

/** TODO SERVICE
 * Get all list with cards of a project
 * @param idProject project id to search lists for
 */
function findAllLists (idProject) {
    return dispatch => {
        const body ={
            projectId: idProject
        }
        _service.Project.getAllWithCards(body)
        .then(res => {
            dispatch({
                type: labels.GET_ALL_LISTS,
                payload: res
            });
        })
    }
}

function loadLists(lists){
    return dispatch => {
        dispatch({
            type: labels.GET_ALL_LISTS,
            payload: lists
        });
    }
}

function findAllMembers (projectId) {
    return dispatch => {
        _service.Project.getAllMembers({ projectId: projectId })
            .then(res => {
                dispatch({
                    type: labels.GET_ALL_MEMBERS,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.GET_ALL_MEMBERS_ERROR,
                    payload: err
                });
            });
    }
}

function createList (listTitle, projectId, listFather, member) {

    const body = {
        listTitle: listTitle,
        listStatus : 0,
        projectId: projectId,
        listFather:listFather
    }
        return dispatch => {
            _service.List.create(body)
            .then(res => { 
                dispatch({
                    type: labels.CREATE_LIST,
                    payload: res
                });
                _service.Action.createActivityForAllMembers({
                    actionType: 0,
                    actionTitle: "List was created",
                    actionDescription: member.memberPseudo + " has create the list '" + listTitle + "'.",
                    memberId: member.memberId,
                    projectId: projectId,
                    actionDateCreation: moment(),
                    mhaStatus: 0
                })
            })
            .catch((err) => {
                dispatch(err)
            });
    }
}

function updateLists (listId,fatherListId) {
    let body = {
        listFather : fatherListId
    }

    return dispatch => {
        _service.List.update(listId,body)
            .then(res => {
                dispatch({
                    type: labels.UPDATE_LIST,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch(err)
            });
    }
}

function getProjectInfo(projectId){
    return dispatch => {
        _service.Project.getOne(projectId)
            .then(res => {
                dispatch({
                    type: labels.GET_PROJECT_INFO,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch(err)
            });
    }
}

function updateProjectTitle(newProjectTitle, projectId){
    const body = {
        projectTitle : newProjectTitle
    }
    return dispatch => {
        _service.Project.update(projectId,body)
            .then(res => {
                _service.Project.getOne(projectId)
                    .then(res => {
                        dispatch({
                            type: labels.GET_PROJECT_INFO,
                            payload: res
                        });
                    })
                    .catch((err) => {
                        dispatch(err)
                    });
            })
            .catch((err) => {
                dispatch(err)
            });
    }
}

function updateProjectVisibility(visibilityValue, projectId){
    const body = {
        projectVisibility : visibilityValue
    }
    return dispatch => {
        _service.Project.update(projectId,body)
            .then(res => {
                _service.Project.getOne(projectId)
                    .then(res => {
                        dispatch({
                            type: labels.GET_PROJECT_INFO,
                            payload: res
                        });
                    })
                    .catch((err) => {
                        dispatch(err)
                    });
            })
            .catch((err) => {
                dispatch(err)
            });
    }
}

function getMemberHasProject(memberId, projectId){
    const body = {
        memberId : memberId,
        projectId: projectId,
        memberhasprojectStatus: 1        
    }
    return dispatch => {
        _service.Project.getMemberHasProject(body)
        .then(res => {
            dispatch({
                type: labels.MEMBER_HAS_PROJECT,
                payload: res
            });
        })
        .catch((err) => {
                dispatch(err)
        });
    }


}

/** TODO SERVICE
 * Send an invitation to a member for a specific project.
 *
 */
function sendInvitationProject(body){
    return dispatch => {

        dispatch({
            type: labels.LOAD
        });

        let newMember = {
            memberLastname: 'unknow',
            memberFirstname: 'unknow',
            memberPseudo: 'unknow',
            memberStatus: 2,
            memberEmail: body.memberEmail
        }
        _service.Member.createIfNotExist(newMember)
            .then(member => {
                body.memberId = member.memberId
                body.memberhasprojectStatus = 0
                body.projectIsFavorite = false

                _service.Project.createAndSendInvitation(body)
                    .then(res => {
                        _service.Project.getAllMembers({ projectId: body.projectId })
                            .then(res => {
                                dispatch({
                                    type: labels.GET_ALL_MEMBERS,
                                    payload: res
                                });
                            })
                            .catch((err) => {
                                dispatch({
                                    type: labels.GET_ALL_MEMBERS_ERROR,
                                    payload: err
                                });
                            });
                    })
                    .catch((err) => {
                        dispatch({
                            type: labels.INVITATION_ERROR
                        })
                    });
            })
            .catch((err) => {
                dispatch({
                    type: labels.INVITATION_ERROR
                })
            });


    }
}
/**TODO SERVICE
 * Get the status of a member for a specific project.
 * Return true if he is admin, else false
 */
function getMemberStatus(projectId, memberId){
    return dispatch => {
        _service.Project.getMemberStatus(({projectId: projectId, memberId: memberId}))
        .then(res => {
            dispatch({
                type: labels.GET_MEMBER_STATUS,
                payload: res.mhppState
            });
        })
        .catch((err) => {
            dispatch({
                type: labels.GET_MEMBER_STATUS_ERROR,
                payload: false
            });
        });
    }
}

/** TODO SERVICE
 * Remove a member from a project
 */
function removeMemberFromProject(query){
    return dispatch => {
        dispatch({
            type: labels.LOAD
        });
        _service.Member.deleteInvitation(query)
            .then(res => {
                dispatch({
                    type: labels.REMOVE_MEMBER_FROM_PROJECT
                })
                _service.Permission.deleteForMemberOnProject(query)
                    .then(res2 => {
                        _service.Project.getAllMembers({ projectId: query.projectId })
                            .then(res => {
                                dispatch({
                                    type: labels.GET_ALL_MEMBERS,
                                    payload: res
                                });
                            })
                            .catch((err) => {
                                dispatch({
                                    type: labels.GET_ALL_MEMBERS_ERROR,
                                    payload: err
                                });
                            });
                    })
                    .catch((err) => {
                        dispatch({
                            type: labels.REMOVE_MEMBER_FROM_PROJECT_ERROR
                        })
                    });
            })
            .catch((err) => {
                dispatch({
                    type: labels.REMOVE_MEMBER_FROM_PROJECT_ERROR
                })
            });
    }
}

/**TODO SERVICE
 * Update the status of a member for a specific project. Set him as admin
 */
function setMemberAsAdmin(projectId, memberId){
    return dispatch => {

        dispatch({
            type: labels.SET_MEMBER_ADMIN,
            payload: false
        });

    }

}

/**
 * get all activities related to a project (Limit 15)
 */
function getActivity(projectId){
    return dispatch => {
        _service.Project.getAllActions({ projectId: projectId })
            .then(res => {
                dispatch({
                    type: labels.GET_ACTIVITY,
                    payload: res
                });
            })
            .catch(err => {
                dispatch({
                    type: labels.GET_ACTIVITY_ERROR
                });
            })
    }
}

/**TODO SERVICE
 * get all labels related to a project
 */
function getLabels(){
    return dispatch => {
        _service.Project.getLabels()
            .then(res => {
                dispatch({
                    type: labels.GET_ALL_LABELS,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch(err)
            });
    }
}

/**
 * Fetch all permissions of all members of a project
 */
function getAllPermissions (projectId) {
    return dispatch => {
        _service.Permission.getAllOnProject({ projectId: projectId })
            .then(res => {
                dispatch({
                    type: labels.GET_ALL_PERMISSIONS,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.GET_ALL_PERMISSIONS_ERROR
                });
            });
    }
}

/**
 * Update store and db permissions
 */
function updatePermissionMember (projectId, memberId, permissionId, mhppState, storeMembers) {
    let query = {
        projectId: projectId,
        memberId: memberId,
        permissionId: permissionId
    }
    let body = {
        mhppState: mhppState
    }
    return dispatch => {
        _service.Permission.updateOnProject(query, body)
            .then(res => {
                if (res) {
                    dispatch({
                        type: labels.UPDATE_PERMISSION_MEMBER,
                        payload: storeMembers
                    });
                } else {
                    dispatch({
                        type: labels.UPDATE_PERMISSION_MEMBER_ERROR
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: labels.UPDATE_PERMISSION_MEMBER_ERROR
                });
            });
    }
}

export const projectAction = {
    labels,
    findAllLists,
    createList,
    updateLists,
    getProjectInfo,
    updateProjectTitle,
    findAllMembers,
    updateProjectVisibility,
    sendInvitationProject,
    getMemberStatus,
    removeMemberFromProject,
    getActivity,
    getLabels,
    updatePermissionMember,
    getMemberHasProject,
    getAllPermissions,
    loadLists
}