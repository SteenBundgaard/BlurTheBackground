import { loginActions } from '../actions/action-types/loginActions'

const initState = {
  loggingIn: false,
  isAuthenticated: false,
  authenticationFailed: false,
  token: null,
}

const authenticationReducer = (state = initState, action) => {
  switch (action.type) {
    case loginActions.LOGIN_REQUEST:
      return {
        loggingIn: true,
        isAuthenticated: false,
        authenticationFailed: false,
        token: null
      };
    case loginActions.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        isAuthenticated: true,
        authenticationFailed: false,
        token: action.token
      };
    case loginActions.LOGIN_FAILURE:
      return {
        loggingIn: false,
        isAuthenticated: false,
        authenticationFailed: true,
        token: null
      };
    case loginActions.LOGIN_RESET:
      return {
        loggingIn: false,
        isAuthenticated: false,
        authenticationFailed: false,
        token: null
      };
    default:
      return state;
  }
}

export default authenticationReducer;