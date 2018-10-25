import axios from 'axios'

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
        dispatch(findOneProject());
        return axios.get('http://localhost:4200/api/project/find_one?projectId=1', config)
            .then(res => {
                console.log(res)
                dispatch(receivedProject({project: res.data}));
            })
            .catch((json) => {
                dispatch(receivedProject({project: "motozerr"}));
            });
    };
}