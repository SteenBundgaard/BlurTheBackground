import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../client/reducers/rootReducer';

const configureStore = (middleware) => {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware, thunk)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../client/reducers/rootReducer', () => {
      const nextRootReducer = require('../client/reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
