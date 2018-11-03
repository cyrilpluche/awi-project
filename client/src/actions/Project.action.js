import _service from '../services'

const labels = {
    GET_ALL_LISTS :"GET_ALL_LISTS",
    CREATE_LIST : "CREATE_LIST",
    UPDATE_LIST : "UPDATE_LIST",
    GET_PROJECT_INFO : "GET_PROJECT_INFO",
    GET_ALL_MEMBERS:"GET_ALL_MEMBERS",
    SEND_INVITATION:"SEND_INVITATION",
    GET_MEMBER_STATUS:"GET_MEMBER_STATUS",
    REMOVE_MEMBER_FROM_PROJECT:"REMOVE_MEMBER_FROM_PROJECT",
    SET_MEMBER_ADMIN : "SET_MEMBER_ADMIN",
    GET_PROJECT_ACTIVITY:"GET_PROJECT_ACTIVITY"
}

/** TODO SERVICE
 * Get all list with cards of a project
 * @param idProject project id to search lists for
 */
function findAllLists (idProject) {
    const fakeLists =[

        {   listId: 147,
            listTitle: "LIST1",
            listStatus: 0,
            listFather: null,
            listChild: null,
            projectId: 1,
            project_id: 1,
            cards:[
                {cardId: 78,cardTitle: "card1", cardDescription: null,cardStatus: 0,cardDateTarget: null,cardDateEnd: null,cardFather: null, cardChild: null,listId: 147,list_id: 147},
                {cardId: 79,cardTitle: "card2", cardDescription: null,cardStatus: 0,cardDateTarget: null,cardDateEnd: null,cardFather: null, cardChild: null,listId: 147,list_id: 147},
            ]
        },
        {   listId: 148,
            listTitle: "LIST2",
            listStatus: 0,
            listFather: 147,
            listChild: null,
            projectId: 1,
            project_id: 1,
            cards:[
                {cardId: 80,cardTitle: "card3", cardDescription: null,cardStatus: 0,cardDateTarget: null,cardDateEnd: null,cardFather: null, cardChild: null,listId: 148,list_id: 148},
                {cardId: 81,cardTitle: "card4", cardDescription: null,cardStatus: 0,cardDateTarget: null,cardDateEnd: null,cardFather: null, cardChild: null,listId: 148,list_id: 148},
            ]
        },
    ]

    return dispatch => {
        /*_service.List.getAll(idProject)
        .then(res => {*/
            dispatch({
                type: labels.GET_ALL_LISTS,
                payload: fakeLists
            });
        /*})
        .catch((err) => {
            dispatch(err)
        });*/
    }
}

function findAllMembers (idProject) {
    return dispatch => {
        _service.Member.getAllMembers(idProject)
        .then(res => {     
            dispatch({
                type: labels.GET_ALL_MEMBERS,
                payload: res
            });
        })
        .catch((err) => {
            dispatch(err)
        });
    }
}

function createList (listTitle, projectId, listFather) {
    
    const body = {
        listTitle: listTitle,
        listStatus : 0,
        projectId: projectId,
        listFather:listFather
    }
        return dispatch => {
            _service.List.create(body)
            .then(res => { 
                     _service.List.getAll(projectId)
                    .then(resFinal => {
                        dispatch({
                            type: labels.GET_ALL_LISTS,
                            payload: resFinal
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

/** TODO SERVICE
 * Send an invitation to a member for a specific project.
 * 
 */
function sendInvitationProject(email,projectId){
    const body = {
        memberEmail : email
    }
    return dispatch => {
        _service.Member.get(body)
        .then(res => {
            if(res){
                console.log(res)
                const body = {
                    memberId : res.memberId,
                    memberEmail : res.memberEmail,
                    projectId: projectId
                }
                /*_service.Project.sendInvitation(body)
                .then(res => {*/
                    dispatch({
                        type: labels.SEND_INVITATION,
                        payload: res
                    });
               /* })
                .catch((err) => {
                    dispatch(err)
                });*/
            }else{
                console.log("EXISTE PAS")
                const body = {
                    memberEmail : email,
                    projectId: projectId
                }
               /* _service.Project.createAndSendInvitation(body)
                .then(res => {*/
                    dispatch({
                        type: labels.SEND_INVITATION,
                        payload: res
                    });
                /*})
                .catch((err) => {
                    dispatch(err)
                });*/
            }
               
        })
        .catch((err) => {
            dispatch(err)
        });

    }
}
/**TODO SERVICE
 * Get the status of a member for a specific project.
 * Return true if he is admin, else false
 */
function getMemberStatus(projectId, memberId){
    const body = {
        memberId : memberId,
        projectId:projectId
    }
    return dispatch => {
        /*_service.Project.getMemberStatus(body)
        .then(res => {*/
            dispatch({
                type: labels.GET_MEMBER_STATUS,
                payload: true
            });
        /*})
        .catch((err) => {
            dispatch(err)
        });*/
    }
}

/** TODO SERVICE
 * Remove a member from a project
 */
function removeMemberFromProject(projectId,memberId){
    const body = {
        memberId : memberId,
        projectId:projectId
    }
    return dispatch => {

        /*_service.Project.removeFromProject(body)
        .then(res => {*/
            dispatch({
                type: labels.REMOVE_MEMBER_FROM_PROJECT,
                payload: false
            });
        /*})
        .catch((err) => {
            dispatch(err)
        });*/
    }
}

/**TODO SERVICE
 * Update the status of a member for a specific project. Set him as admin
 */
function setMemberAsAdmin(projectId, memberId){
    const body = {
        memberId : memberId,
        projectId:projectId
    }
    return dispatch => {

        /*_service.Project.setAsAdmin(body)
        .then(res => {*/
            dispatch({
                type: labels.SET_MEMBER_ADMIN,
                payload: false
            });
        /*})
        .catch((err) => {
            dispatch(err)
        });*/
    }

}

/**TODO SERVICE
 * get all activities related to a project (Limit 15)
 */
function getActivity(projectId){
    return dispatch => {

        /*_service.Project.getActivity(projectId)
        .then(res => {*/
            dispatch({
                type: labels.GET_PROJECT_ACTIVITY,
                payload: false
            });
        /*})
        .catch((err) => {
            dispatch(err)
        });*/
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
    setMemberAsAdmin,
    getActivity
}