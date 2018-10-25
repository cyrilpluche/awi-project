import _service from '../services'

const labels = {
    SELECT_PROJECT: 'project:select_one',
    FIND_ONE_PROJECT: 'project:find_one',
    RECEIVE_PROJECT: 'project:received'
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

export const dashboardAction = {
    labels,
    fetchProject
}