import { loginActions } from '../actions/action-types/loginActions'

const initState = {
  loggingIn: false,
  isAuthenticated: false,
  authenticationFailed: false,
  token: null,
  refreshTokenPromise: null,
}

const authenticationReducer = (state = initState, action) => {
  switch (action.type) {
    case loginActions.LOGIN_REQUEST:
      return {
        loggingIn: true,
        isAuthenticated: false,
        authenticationFailed: false,
        token: null,
        refreshTokenPromise : null
      };
    case loginActions.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        isAuthenticated: true,
        authenticationFailed: false,
        token: action.token,
        refreshTokenPromise : null
      };
    case loginActions.LOGIN_FAILURE:
      return {
        loggingIn: false,
        isAuthenticated: false,
        authenticationFailed: true,
        token: null,
        refreshTokenPromise : null
      };
    case loginActions.LOGIN_RESET:
      return {
        loggingIn: false,
        isAuthenticated: false,
        authenticationFailed: false,
        token: null,
        refreshTokenPromise : null
      };
    case loginActions.LOGIN_REFRESHING:
      return {
        loggingIn: false,
        isAuthenticated: true,
        authenticationFailed: false,
        token: null,
        refreshTokenPromise : action.refreshTokenPromise
      };
    default:
      return state;
  }
}

export default authenticationReducer;