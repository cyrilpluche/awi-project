import _service from '../services'

const labels = {
    SELECT_PROJECT: 'project:select_one',
    FIND_ONE_PROJECT: 'project:find_one',
    RECEIVE_PROJECT: 'project:received',
    SELECT_ALL_PROJECT: 'project:select_all', // at the begin
    SELECT_ALL_PROJECT_MEMBER: 'project:select_all_project_member',
    CREATE_NEW_PROJECT: 'project:create_new',
    UPDATE_MEMBER_HAS_PROJECT: 'project:update_member_has_project',
    DASHBOARD_ACTION_ERROR: 'project:dashboard_error',
    DASHBOARD_HIDE_ERROR_MSG: 'project:hide_error_msg'
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
                errorMsg: 'An error has occured. We can\'t load your project for the moment, please try later or contact an administrator.'
            })
        })
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
                errorMsg: 'An error has occured, impossible to execute this action'
            })
        })
}

function createProject (project_title, project_visibility, project_status, project_date_target) {
    let o = {
        project_title, project_visibility, project_status, project_date_target
        // member to send invitation
    }
    return dispatch => _service.Project.createAndSendInvitation(o)
        .then(d => {
            dispatch({ // TODO maybe load all the projects of the member
                type: labels.CREATE_NEW_PROJECT,

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
    hideErrorMessage
}