import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Front from './components/Front'
import Footer from './components/Footer'
import TermsOfService from './components/TermsOfService'
import PrivacyPolicy from './components/PrivacyPolicy'
import SignIn from './components/SignIn'
import ScrollToTop from './components/ScrollToTop';
import MountMaterialize from './components/MountMaterialize';
import PrivateRoute from './components/PrivateRoute';
import FacebookInit from './components/FacebookInit';
import Upload from './components/Upload'
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