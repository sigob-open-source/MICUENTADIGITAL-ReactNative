// Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const _createStore = (initialState = {}) => {
  const middlewares = [];
  const enhancers = [];
  const store = createStore(
    rootReducer(),
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers),
  );
  const persistor = persistStore(store);
  return { persistor, store };
};

export const { store, persistor } = _createStore();

export default store;
