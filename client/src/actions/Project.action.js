import _service from '../services'
import moment from "moment";
import _helper from '../helpers'

const labels = {
    LOAD_PROJECT: "LOAD_PROJECT",
    GET_ALL_LISTS :"GET_ALL_LISTS",
    CREATE_LIST : "CREATE_LIST",
    CREATE_LIST_ERROR: "CREATE_LIST_ERROR",
    UPDATE_LIST : "UPDATE_LIST",
    UPDATE_LIST_ERROR : "UPDATE_LIST_ERROR",
    GET_PROJECT_INFO : "GET_PROJECT_INFO",
    GET_PROJECT_INFO_ERROR:"GET_PROJECT_INFO_ERROR",
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
    MEMBER_HAS_PROJECT_ERROR:"MEMBER_HAS_PROJECT_ERROR",
    LOAD: "LOAD",
    GET_ALL_PERMISSIONS: "GET_ALL_PERMISSIONS",
    GET_ALL_PERMISSIONS_ERROR: "GET_ALL_PERMISSIONS_ERROR",
    UPDATE_PERMISSION_MEMBER: "UPDATE_PERMISSION_MEMBER",
    UPDATE_PERMISSION_MEMBER_ERROR: "UPDATE_PERMISSION_MEMBER_ERROR",
    UPDATE_PROJECT_INFO:"UPDATE_PROJECT_INFO"
}

/** Find all list of a project
 * Get all list with cards of a project
 * @param idProject project id to search lists for
 */
function findAllLists (idProject) {
    return dispatch => {
        dispatch({ type: labels.LOAD_PROJECT })
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

/**Update store when receiving lists from socket
 * @param lists lists received from socket event
 */
function loadLists(lists){
    return dispatch => {
        dispatch({
            type: labels.GET_ALL_LISTS,
            payload: lists
        });
    }
}

/**Update store when receiving new info from socket
 * @param projectInfo received from socket event
 */
function loadProjectInfo(projectInfo){
    return dispatch => {
        dispatch({
            type: labels.UPDATE_PROJECT_INFO,
            payload: projectInfo
        });
    }
}

/**Find all member of a project
 * @param projectId project Id
 */
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

/**Create a new list
 * @param listTitle new list title
 * @param projectId project Id of the list
 * @param member member that has created the list
 */
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
                console.log(err)
                dispatch({
                    type: labels.CREATE_LIST_ERROR,
                    payload: err
                });
            });
    }
}

/** Update a list
 * @param listId list Id
 * @param fatherListId list father id
 */
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
                })
            })
            .catch((err) => {
                dispatch({
                    type: labels.UPDATE_LIST_ERROR,
                    payload: err
                })
            });
    }
}

/** Get all information about a project
 * @param projectId project Id
 */
function getProjectInfo(projectId){
    return dispatch => {
        _service.Project.getOne(projectId)
            .then(res => {
                if (res.length > 0) {
                    dispatch({
                        type: labels.GET_PROJECT_INFO,
                        payload: res
                    });
                } else {
                    dispatch({
                        type: labels.GET_PROJECT_INFO_ERROR
                    });
                    _helper.History.push('/home')
                }

            })
            .catch((err) => {
                dispatch({
                    type: labels.GET_PROJECT_INFO_ERROR,
                    payload: err
                });
            });
    }
}

/**Update Project Title
 * @param newProjectTitle new title of the project
 * @param projectId project Id 
 */
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
                        dispatch({
                            type: labels.GET_PROJECT_INFO_ERROR,
                            payload: err
                        });
                    });
            })
            .catch((err) => {
                dispatch({
                    type: labels.GET_PROJECT_INFO_ERROR,
                    payload: err
                });
            });
    }
}

/** Update visibility of a project
 * @param visibilityValue status of visibility, 0 is public, 1 is private
 * @param projectId project id
 */
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
                        dispatch({
                            type: labels.GET_PROJECT_INFO_ERROR,
                            payload: err
                        });
                    });
            })
            .catch((err) => {
                dispatch({
                    type: labels.GET_PROJECT_INFO_ERROR,
                    payload: err
                });
            });
    }
}

/** Check if user is a project member
 * @param memberId member id
 * @param projectId project id
 */
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
            dispatch({
                type: labels.MEMBER_HAS_PROJECT_ERROR,
                payload: err
            });
        });
    }


}

/** Send an invitation to a member for a specific project.
 * @param body Object that contains member id and project id
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

/** Get the status of a member for a specific project (if he is admin or not)
 * @param projectId project Id
 * @param memberId member Id
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

/** Remove a member from a project
 * @param query Contains member Id and project id
 */
function removeMemberFromProject(query){
    return dispatch => {
        dispatch({
            type: labels.LOAD
        });
        _service.Member.deleteInvitation(query)
            .then(res => {
                _service.Permission.deleteForMemberOnProject(query)
                    .then(isDeleted => {
                        dispatch({
                            type: labels.REMOVE_MEMBER_FROM_PROJECT
                        })
                        dispatch({ type: labels.LOAD_PROJECT })
                        const body ={
                            projectId: query.projectId
                        }
                        _service.Project.getAllWithCards(body)
                            .then(res => {
                                dispatch({
                                    type: labels.GET_ALL_LISTS,
                                    payload: res
                                });
                            })
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

/** Get all activities related to a project (Limit 15)
 * @param projectId project Id
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

/**Get all labels related to a project
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

/** Fetch all permissions of all members of a project
 * @param projectId project Id
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

/** Update permission of a member in a project (store and db permissions)
 * @param projectId project Id
 * @param memberId member Id
 * @param permissionId permission Id
 * @param mhppState 
 * @param storeMembers
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
    loadLists,
    loadProjectInfo
}