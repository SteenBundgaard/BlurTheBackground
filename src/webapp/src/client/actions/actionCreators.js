import { loginActions } from './action-types/loginActions'
import { uploadActions } from './action-types/uploadActions'
import { push } from 'react-router-redux'

export const actions = {
    apiLogin,
    refreshToken,
    upload
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
                        dispatch(success(token));
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

function refreshToken() {
    return dispatch => {
        let refreshTokenPromise = new Promise(function (resolve, reject) {

            apiLogin()(action => {
                if (action.type === loginActions.LOGIN_SUCCESS) {
                    dispatch(action);
                    resolve();
                } else if (action.type === loginActions.LOGIN_FAILURE || action.type === loginActions.LOGIN_RESET) {
                    dispatch({ type: loginActions.LOGIN_RESET });
                    reject('could not refresh token');
                }
            })
        });

        dispatch({ type: loginActions.LOGIN_REFRESHING, refreshTokenPromise });
        return refreshTokenPromise;
    }
}

function upload(rawImage, name) {
    return (dispatch, getState) => {
        dispatch({ type: uploadActions.UPLOADING, image: rawImage, name: name });
        let token = getState().authentication.token;
        if (!token)
            token = uuidv4();
        const options = {
            method: 'POST',
            body: JSON.stringify({ image: rawImage.split(',')[1] }),
            cache: 'default',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        fetch('/api/upload/', options)
            .then(r => poll(token, dispatch))
            .catch(err => {
                console.log('fail');
                dispatch(failure());
            });
    }

    function failure() { return { type: uploadActions.FAILURE } }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    function poll(token, dispatch) {
        return new Promise((resolve, reject) => {
            let max = 60;
            function callFetch() {
                console.log('yeah');
                max--;
                try {
                    const options = {
                        method: 'GET',
                        cache: 'default',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    };
                    fetch('/api/fetch/', options)
                        .then(r => {
                            if (r.status === 200) {
                                r.json().then(json => dispatch({ type: uploadActions.UPLOADED, image: json.image }))
                                resolve();
                                return;
                            }
                            if (r.status > 299) {
                                reject('processing failed');
                                return;
                            }
                            setTimeout(callFetch, 10000);
                        });
                } catch (error) {
                    console.log(error);
                    reject('processing failed')
                }
            }
            callFetch();   
        });
    }
}