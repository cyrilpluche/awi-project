import { combineReducers } from 'redux';
import { dashboard } from './Dashboard.reducer';
import { signin } from './Signin.reducer';
import { signup } from './Signup.reducer';


const rootReducer = combineReducers({
    dashboard,
    signin,
    signup
});

export default rootReducer;