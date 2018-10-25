import { combineReducers } from 'redux';
import { dashboard } from './Dashboard.reducer';
import { signin } from './Signin.reducer';

const rootReducer = combineReducers({
    dashboard,
    signin
});

export default rootReducer;