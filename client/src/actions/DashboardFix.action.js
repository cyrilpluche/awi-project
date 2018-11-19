import _service from "../services";
import _helper from "../helpers";
import moment from "moment";

const labels = {
    LOAD_DASHBOARD: "LOAD_DASHBOARD",
    LOAD_ALL_PROJECTS_FOR_MEMBER: "LOAD_ALL_PROJECTS_FOR_MEMBER",
    LOAD_ALL_PROJECTS_FOR_MEMBER_ERROR: "LOAD_ALL_PROJECTS_FOR_MEMBER_ERROR",
    CREATE_PROJECT: "CREATE_PROJECT",
    CREATE_PROJECT_ERROR: "CREATE_PROJECT_ERROR",
    SET_PROJECT_FAVORITE: "SET_PROJECT_FAVORITE",
    SET_PROJECT_FAVORITE_ERROR: "SET_PROJECT_FAVORITE_ERROR"
}

function findAllProjectsMember (memberId) {
    let query = {
        memberId: memberId,
        memberhasprojectStatus: 1
    }
    return dispatch => {
        dispatch({ type: labels.LOAD_DASHBOARD })
        _service.Project.getAllProjectsForMember(query)
            .then(res => {
                dispatch({
                    type: labels.LOAD_ALL_PROJECTS_FOR_MEMBER,
                    payload: res
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.LOAD_ALL_PROJECTS_FOR_MEMBER_ERROR,
                });
            });
    }
}

function createProject (memberId, projectTitle, projectVisibility, member) {
    let body = {
        projectTitle: projectTitle,
        projectVisibility: projectVisibility,
        projectStatus: 0
    }
    return dispatch => {
        dispatch({ type: labels.LOAD_DASHBOARD })
        _service.Project.createProjectFix(body)
            .then(project => {
                body = {
                    projectId: project.projectId,
                    memberId: memberId,
                    memberhasprojectStatus: 1,
                    projectIsFavorite: false
                }
                _service.Project.createProjectForMember(body)
                    .then(mhp => {
                        /** Let's create permission */
                        let permissionId = 3
                        let mhppState = true
                        _service.Permission
                            .createMemberProjectPermission(memberId, project.projectId, permissionId, mhppState)
                            .then(permission => {

                                _service.Action.createActivityForAllMembers({
                                    actionType: 0,
                                    actionTitle: "Project was created",
                                    actionDescription: member.memberPseudo + " has create the project '" + projectTitle + "'.",
                                    memberId: memberId,
                                    projectId: project.projectId,
                                    actionDateCreation: moment(),
                                    mhaStatus: 0
                                })
                                    .then(res => {
                                        dispatch({
                                            type: labels.CREATE_PROJECT,
                                            payload: {
                                                project: {
                                                    Project: project
                                                },
                                                contributors: 1
                                            }
                                        })
                                        console.log(project.projectId)
                                        _helper.History.push('/project/' + project.projectId)
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        dispatch({
                                            type: labels.CREATE_PROJECT_ERROR,
                                        });
                                    });


                            })
                    })
                    .catch((err) => {
                        console.log(err)

                        dispatch({
                            type: labels.CREATE_PROJECT_ERROR,
                        });
                    });
            })
            .catch((err) => {
                console.log(err)

                dispatch({
                    type: labels.CREATE_PROJECT_ERROR,
                });
            });
    }
}

function setAsProjectFavorite (memberId, projectId, projectIsFavorite, index) {
    let query = {
        memberId: memberId,
        projectId: projectId
    }
    let body = {
        projectIsFavorite: projectIsFavorite
    }
    return dispatch => {
        _service.Project.updateFix(query, body)
            .then(res => {
                dispatch({
                    type: labels.SET_PROJECT_FAVORITE,
                    payload: {
                        projectIsFavorite: projectIsFavorite,
                        index: index
                    }
                });
            })
            .catch((err) => {
                dispatch({
                    type: labels.SET_PROJECT_FAVORITE_ERROR,
                });
            });
    }
}

export const dashboardFixAction = {
    labels,
    findAllProjectsMember,
    createProject,
    setAsProjectFavorite
}