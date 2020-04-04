import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../components/reducers/rootReducer';

const configureStore = (middleware) => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, ...middleware)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../components/reducers/rootReducer', () => {
      const nextRootReducer = require('../components/reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
