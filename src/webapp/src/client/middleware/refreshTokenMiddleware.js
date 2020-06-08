import { actions } from '../actions/actionCreators'
import jwtDecode from 'jwt-decode'

export function refreshTokenMiddleware({ dispatch, getState }) {

    return (next) => (action) => {
        if (typeof action === 'function') {
            let token = getState().authentication.token;
            if (token) {
                token = jwtDecode(token);
                if ((token.exp - 5) * 1000 <= Date.now()) {

                    if (!getState().authentication.refreshTokenPromise) {
                        return actions.refreshToken()(dispatch).then(() => next(action));
                    } else {
                        return getState().authentication.refreshTokenPromise.then(() => next(action));
                    }
                }
            }
        }
        return next(action);
    };
}