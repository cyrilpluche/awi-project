import _service from '../services'

export const SELECT_PROJECT = 'project:select_one';
export const FIND_ONE_PROJECT = 'project:find_one';
export const RECEIVE_PROJECT = 'project:received';

export const findOneProject = () => ({
    type: FIND_ONE_PROJECT,
});
export const receivedProject = json => ({
    type: RECEIVE_PROJECT,
    json: json.project,
});

export function fetchProject(attributes) {
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