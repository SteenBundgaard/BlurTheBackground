import { loginActions } from './action-types/loginActions';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux'

export const actions = {
    apiLogin,
};

function apiLogin() {
    return dispatch => {
        dispatch(request());
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                const tokenBlob = new Blob([JSON.stringify({ access_token: response.authResponse.accessToken }, null, 2)], { type: 'application/json' });
                const options = {
                    method: 'POST',
                    body: tokenBlob,
                    cache: 'default'
                };
                fetch('/api/auth/facebook', options).then(r => {
                    const token = r.headers.get('x-auth-token');
                        if (token && r.ok) {
                            dispatch(success(jwtDecode(token)));
                            dispatch(push('/'));
                        } 
                        else {
                            dispatch(failure());
                        } 
                }). 
                catch(err => { 
                    dispatch(failure()); 
                }); 
            } else {
                dispatch(reset());
            }
        }); 
    };

    function request() { return { type: loginActions.LOGIN_REQUEST } }
    function success(token) { return { type: loginActions.LOGIN_SUCCESS, token } }
    function failure() { return { type: loginActions.LOGIN_FAILURE } }
    function reset() { return { type: loginActions.LOGIN_RESET } }
}
