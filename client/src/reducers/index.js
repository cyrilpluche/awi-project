import { combineReducers } from 'redux';
import { dashboard } from './Dashboard.reducer';
import { signin } from './Signin.reducer';
import { signup } from './Signup.reducer';
import { navbar } from './Navbar.reducer';
import { project } from './Project.reducer';

const rootReducer = combineReducers({
    dashboard,
    signin,
    signup,
    navbar,
    project
});

export default rootReducer;