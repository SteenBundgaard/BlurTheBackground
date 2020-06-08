import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import initialization from './initializationReducer';
import upload from './uploadReducer';

const rootReducer = combineReducers({
    authentication,
    initialization,
    upload
  });
  
export default rootReducer;