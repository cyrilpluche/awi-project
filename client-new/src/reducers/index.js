import { combineReducers } from 'redux';
import { dashboard } from './Dashboard.reducer';


const rootReducer = combineReducers({
    dashboard
});

export default rootReducer;