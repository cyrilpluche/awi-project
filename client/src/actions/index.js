import axios from "axios"
import {AT_PRELLO} from "./actions-types"
const END_POINT = "http://localhost:3000"

export function signIn(login, password){
    return function(dispatch){
      /*   requete au back-end  
        axios.get(`${END_POINT}/posts/${id}`).then( (response) => {
            dispatch({type:AT_PRELLO.LOGIN,payload:response.data})
        }).catch( (error) =>{
            dispatch({type:AT_PRELLO.ERROR,payload:error.data})
        })*/
    }
}

export function signUp(new_user){
    return{
        type: AT_PRELLO.CREATE_USER,
        payload: {
            user: new_user
        }
    }
}