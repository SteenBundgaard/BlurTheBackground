import React from 'react';
import Style from './SignIn.module.css'
import { actions } from './actions/actionCreators'
import { connect } from 'react-redux'
import Spinner from '../images/spinner.gif'
import SignInFailed from './SignInFailed'

class SignIn extends React.Component {
   
    componentDidMount = () => {
        if (!this.props.loggingIn) {
            this.renderLogin();
            window.addEventListener('FBAuthenticated', () => this.props.dispatch(actions.apiLogin()));
        }
    }

    componentDidUpdate = () => {
        if (!this.props.loggingIn) {
            this.renderLogin();
        }
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    renderLogin = () => {
        fbLoaded.promise.then(() => {
            FB.XFBML.parse();
        });
    }

    render = () => {
        const loggingIn = this.props.loggingIn;
        return (
            <div className={Style.background}>
                <div className="row">
                </div>
                <div className="row">
                </div>
                <div className={Style.container}>
                    <div className={`${Style.row}`}>
                        <div className="col s12 l4 offset-l4 valign">
                            <div className="card-panel lighten-3">
                                <div className="card-content">
                                    <h4 className="card-title center-align">Sign in</h4>
                                    <form>
                                        <div className="row">
                                        </div>
                                        <div className="row">
                                        </div>
                                        <div className="row center-align" style={{ height: '40px' }}>
                                            <div className="fb-login-button" data-onlogin="window.dispatchEvent(new Event('FBAuthenticated'));" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>
                                            {loggingIn && <img className={Style.spinner} src={Spinner} />}
                                        </div>                                       
                                    </form>
                                    {this.props.authenticationFailed && <SignInFailed/>}
                                </div>
                                <div className="row">
                                    <div className={Style.small}>
                                        <p>We offer this service completely free but requires you to sign in. No credit card needed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const loggingIn = state.authentication.loggingIn;
    const authenticationFailed = state.authentication.authenticationFailed;
    return {
        loggingIn,
        authenticationFailed
    };
}

const connectedLoginPage = connect(mapStateToProps)(SignIn);

export default connectedLoginPage;

