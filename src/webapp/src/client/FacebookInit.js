import React from "react";
import { actions } from './actions/actionCreators'
import { connect } from 'react-redux'
import { initializationActions } from './actions/action-types/initializationActions'

class FacebookInit extends React.Component {
    componentDidMount() {
        var self = this;

        function Deferred() {
            var self = this;
            this.promise = new Promise(function (resolve, reject) {
                self.reject = reject
                self.resolve = resolve
            })
        }
        window.fbLoaded = (new Deferred());

        window.fbAsyncInit = function () {
            FB.init({
                appId: '222286185833824',
                cookie: true,
                xfbml: true,
                version: 'v6.0'
            });

            fbLoaded.resolve()

            FB.AppEvents.logPageView();
            self.props.dispatch({ type: initializationActions.SDK_LOADED });
            self.props.dispatch(actions.apiLogin());
        }
    }

    render() {
        return null;
    }
}

function mapStateToProps() {
    return {};
}

const connectedFacebookInit = connect(mapStateToProps)(FacebookInit);

export default connectedFacebookInit;
