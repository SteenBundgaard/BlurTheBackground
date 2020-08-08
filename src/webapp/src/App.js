import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Navbar from './client/Navbar'
import Front from './client/Front'
import Footer from './client/Footer'
import TermsOfService from './client/TermsOfService'
import PrivacyPolicy from './client/PrivacyPolicy'
import SignIn from './client/SignIn'
import ScrollToTop from './client/ScrollToTop';
import MountMaterialize from './client/MountMaterialize';
import PrivateRoute from './client/PrivateRoute';
import FacebookInit from './client/FacebookInit';
import Upload from './client/Upload'
import TryIt from './client/TryIt'
import { connect } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css';
import './style.css'
 
class App extends Component {

  componentDidMount = () => {    
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#000"
        },
        "button": {
          "background": "#f1d600"
        }
      },
      "theme": "classic"
    });
  }

  render() {
    return (
        <div className="App">
          <FacebookInit />
          <ScrollToTop />
          <MountMaterialize />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Front} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/try-it" component={TryIt} />
            <PrivateRoute path="/upload" component={Upload} isAuthenticated={this.props.isAuthenticated}/>
          </Switch>
          <Footer />
        </div>
    );
  }
}

function mapStateToProps(state) {
  let  isAuthenticated = state.authentication.isAuthenticated;
  return {
      isAuthenticated
  };
}

export default connect(mapStateToProps)(App)