import { combineReducers } from 'redux';
import { dashboard } from './Dashboard.reducer';
import { signin } from './Signin.reducer';
import { signup } from './Signup.reducer';
import {updatecard} from "./Updatecard.reducer";


const rootReducer = combineReducers({
    dashboard,
    signin,
    signup,
    updatecard
});

export default rootReducer;