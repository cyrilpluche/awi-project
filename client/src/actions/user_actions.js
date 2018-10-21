export const ADD_USER = "users:add_user";

export function add_user(new_user){
    return{
        type: ADD_USER,
        payload: {
            firstname: new_user.firstname,
            lastname: new_user.lastname,
            email: new_user.email,
            password: new_user.password
            }
        }
    }