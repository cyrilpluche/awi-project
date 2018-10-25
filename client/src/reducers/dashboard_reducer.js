import { FIND_ONE_PROJECT } from '../actions/project_action'

export default function dashboardReducer (state = {}, { type, payload}) {
    console.log(state)
    switch (type) {
        case FIND_ONE_PROJECT: return payload
        default:
            return state
    }
}