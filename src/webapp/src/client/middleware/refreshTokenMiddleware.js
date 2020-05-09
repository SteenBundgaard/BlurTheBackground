import { actions } from '../actions/actionCreators'

export function refreshTokenMiddleware({ dispatch, getState }) {

    return (next) => (action) => {
        if (typeof action === 'function') {
            let token = getState().authentication.token;
            if (token) {
                if ((token.exp - 5) * 1000 <= Date.now()) {

                    if (!getState().authentication.refreshTokenPromise) {
                        return actions.refreshToken()(dispatch).then(() => next(action));
                    } else {
                        return getState().auth.refreshTokenPromise.then(() => next(action));
                    }
                }
            }
        }
        return next(action);
    };
}