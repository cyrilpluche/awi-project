import dashboardReducer from './Dashboard.reducer';
import { combineReducers } from 'redux'

const reducer = combineReducers(
    dashboardReducer
)

export default reducer