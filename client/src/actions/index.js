import axios from "axios"
import {AT_PRELLO} from "./action-types"
const END_POINT = "http://localhost:3000"

export function signIn(login, password){
    return function(dispatch){
      /*     
        axios.get(`${END_POINT}/posts/${id}`).then( (response) => {
            dispatch({type:AT_PRELLO.LOGIN,payload:response.data})
        }).catch( (error) =>{
            dispatch({type:AT_PRELLO.ERROR,payload:error.data})
        })*/
    }
}