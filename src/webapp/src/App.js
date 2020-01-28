import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Front from './components/Front'
import Footer from './components/Footer'
import TermsOfService from './components/TermsOfService'
import PrivacyPolicy from './components/PrivacyPolicy'
import AppReducer from './components/reducers/AppReducer'
import ScrollToTop from './components/ScrollToTop';
import MountMaterialize from './components/MountMaterialize';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'materialize-css/dist/css/materialize.min.css';
import './style.css'


const store = createStore(AppReducer);

class App extends Component {

  componentDidMount() {
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
      <Provider store={store}>
        <div className="App">
          <ScrollToTop/>
          <MountMaterialize/>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Front} />
            <Route path="/TermsOfService" component={TermsOfService} />
            <Route path="/PrivacyPolicy" component={PrivacyPolicy} />
          </Switch>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;