import _service from '../services'
import _helper from '../helpers'

const labels = {
    SELECT_PROJECT: 'project:select_one',
    FIND_ONE_PROJECT: 'project:find_one',
    RECEIVE_PROJECT: 'project:received',
    SELECT_ALL_PROJECT: 'project:select_all', // at the begin
    SELECT_ALL_PROJECT_MEMBER: 'project:select_all_project_member',
    SELECT_ALL_TEAM_MEMBER: 'project:select_all_team_member',
    CREATE_NEW_PROJECT: 'project:create_new',
    UPDATE_MEMBER_HAS_PROJECT: 'project:update_member_has_project',
    DASHBOARD_ACTION_ERROR: 'project:dashboard_error',
    DASHBOARD_HIDE_ERROR_MSG: 'project:hide_error_msg' // to hide the error message
}

const findOneProject = () => ({
    type: labels.FIND_ONE_PROJECT,
})

const receivedProject = json => ({
    type: labels.RECEIVE_PROJECT,
    json: json.project,
})

function fetchProject(attributes) {
    return (dispatch) => {

        dispatch(findOneProject())

        _service.Project.get(attributes)
            .then(res => {
                dispatch(receivedProject({project: res}));
            })
            .catch((err) => {
                console.log('Error : ', err)
            });
    };
}

function getAllProjectsMember (member_id) {
    return dispatch => _service.Project.getAllProjectsMember(member_id)
        .then(projects => {
            dispatch({
                type: labels.SELECT_ALL_PROJECT_MEMBER,
                payload: projects
            })
        })
        .catch (e => {
            dispatch({
                type: labels.DASHBOARD_ACTION_ERROR,
                errorMsg: 'We can\'t load your project for the moment, please try later or contact an administrator.'
            })
        })
}

function getAllTeams(member_id) {
    return dispatch => {
        _service.Team.getAll(member_id).then(teams => {
            dispatch({
                type: labels.SELECT_ALL_TEAM_MEMBER,
                payload: teams
            })
        }).catch( () => dispatch({
            type: labels.DASHBOARD_ACTION_ERROR,
            errorMsg: 'Impossible to load your team for the moment. Please try later or contact an administrator.'
        }))
    }
}


function updateMemberHasProject (projectId, memberId, projectIsFavorite, memberhasprojectStatus) {
    let dataObject = {
        projectId, memberId, projectIsFavorite, memberhasprojectStatus
    }

    return dispatch => _service.Project.updateMemberHasProject(dataObject)
        .then(id => {
            dispatch({
                type: labels.UPDATE_MEMBER_HAS_PROJECT,
                payload: {
                    projectId, projectIsFavorite
                }
            })
        })
        .catch (e => {
            dispatch({
                type: labels.DASHBOARD_ACTION_ERROR,
                errorMsg: 'impossible to execute this action'
            })
        })
}

function createProject (projectTitle, projectVisibility, projectStatus, projectDateTarget,
                        memberId, memberhasprojectStatus = 0) {

    return dispatch => _service.Project.createProject( projectTitle, projectVisibility, projectStatus, projectDateTarget)
        .then(project => {
            let projectId = project.projectId
            return _service.Project.createMemberHasProject(memberId, projectId, memberhasprojectStatus)
                .then( () => {
                    let project = {
                        projectId,
                        projectTitle,
                        projectVisibility,
                        projectStatus,
                        projectDateTarget
                    }
                    dispatch({
                        type: labels.CREATE_NEW_PROJECT,
                        payload: project
                    })
                    // todo add permission
                    _helper.History.push('/project/' + projectId)
                })
    }).catch (e => {
            dispatch({
                type: labels.DASHBOARD_ACTION_ERROR,
                errorMsg: 'The project wasn`t able to be created. Please try later or contact an administrator.'
            })
        })
}

function hideErrorMessage() {
    return dispatch => dispatch({
        type: labels.DASHBOARD_HIDE_ERROR_MSG
    })
}

export const dashboardAction = {
    labels,
    fetchProject,
    getAllProjectsMember,
    createProject,
    updateMemberHasProject,
    hideErrorMessage,
    getAllTeams
}