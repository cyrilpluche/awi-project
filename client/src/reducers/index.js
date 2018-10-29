import { combineReducers } from 'redux';
import { dashboard } from './Dashboard.reducer';
import { signin } from './Signin.reducer';
import { signup } from './Signup.reducer';
import { navbar } from './Navbar.reducer';
import { profile } from './Profile.reducer';

const rootReducer = combineReducers({
    dashboard,
    signin,
    signup,
    navbar,
    profile
});

export default rootReducer;