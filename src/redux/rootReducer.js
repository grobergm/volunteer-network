import { combineReducers } from 'redux';
import view from './view';
import profile from './profile';

const rootReducer=combineReducers({view,profile})

export default rootReducer;