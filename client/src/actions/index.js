import axios from "axios"
import {AT_PRELLO} from "./actions-types"
const url = "http://localhost:4200/api/member"

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

export function signUpOld(new_user){

    return{
        type: AT_PRELLO.CREATE_USER,
        payload: {
            user: new_user
        }
    }
}

export function signUp (user) {
    axios.post(url + '/sign_up', user)
        .then(res => {
            return function (dispatch){
               dispatch({
                   type: AT_PRELLO.CREATE_USER,
                   payload: {
                       user: user,
                       token: res
                   }
               })
            }
        })
        .catch(function (error) {
            return {
                type: AT_PRELLO.CREATE_USER,
                payload: {
                    user: user,
                    token: "no-token"
                }
            };
        });
}