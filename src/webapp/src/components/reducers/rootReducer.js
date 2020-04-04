import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import initialization from './initializationReducer';

const rootReducer = combineReducers({
    authentication,
    initialization
  });
  
export default rootReducer;