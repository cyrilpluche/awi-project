import actions from '../actions';


export function userReducer(state = "", {type,payload}){
    console.log(type)
    if (type) {
        switch (type) {
            case actions.signinAction.AT_PRELLO.LOGIN:
            console.log("dans le case login")
                return {
                   
                    auth : payload
                };
            default:
                return state
        }
    } else {
        return state
    }
    
}

