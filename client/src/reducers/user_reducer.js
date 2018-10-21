import {ADD_USER} from "../actions/user_actions";

export default function user_reducer(state = '', action){
    switch (action.type) {
        case ADD_USER:
            return action.payload;
        default:
            return state;
    }
}