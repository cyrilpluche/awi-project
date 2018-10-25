import {applyMiddleware, combineReducers, compose} from 'redux';
import userReducer from "./reducer_signup";
import dashboardReducer from "./dashboard_reducer";
import thunk from "redux-thunk";

const rootReducer = compose(
    //applyMiddleware(thunk),
    combineReducers({
        user: userReducer,
        dashboard: dashboardReducer
    })
)

export default rootReducer;