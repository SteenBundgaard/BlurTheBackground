import App from './App';
import { Router } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './common/configureStore';
import { routerMiddleware } from 'react-router-redux'
import { history } from './client/helpers/history';
import { refreshTokenMiddleware } from './client/middleware/refreshTokenMiddleware';

const middleware = routerMiddleware(history)
const store = configureStore([middleware, refreshTokenMiddleware]);

hydrate(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
