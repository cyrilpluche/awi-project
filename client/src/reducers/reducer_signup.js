import {AT_PRELLO} from "../actions/actions-types"

export default function userReducer(state = '', {type,payload}){
    switch (type) {
        case AT_PRELLO.CREATE_USER:
            return payload.user;
        default:
            return state;
    }
}