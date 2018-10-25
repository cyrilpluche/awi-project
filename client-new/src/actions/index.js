import axios from 'axios'
import _services from '../services'

const config = {
    headers: {'X-Requested-With': 'XMLHttpRequest'},
}

export const SELECT_PROJECT = 'project:select_one';
export const FIND_ONE_PROJECT = 'project:find_one';
export const RECEIVE_PROJECT = 'project:received';

export const getProject = project => ({
    type: SELECT_PROJECT,
    project
});

export const findOneProject = () => ({
    type: FIND_ONE_PROJECT,
});
export const receivedProject = json => ({
    type: RECEIVE_PROJECT,
    json: json.project,
});

export function fetchProject(project) {
    return (dispatch) => {

        dispatch(findOneProject())

        _services.Project.getAll()
            .then(res => {
                dispatch(receivedProject({project: res.data[0]}));
            })
            .catch((err) => {
                console.log('Error : ', err)
            });
    };
}