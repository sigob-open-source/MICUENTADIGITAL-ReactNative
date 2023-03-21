// External dependencies
import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
} from 'redux';
import { persistStore } from 'redux-persist';

// Internal dependencies
import rootReducer from './reducers';
import { AppStateProps } from './reducers/app';
import { AuthStateProps } from './reducers/auth';
import { PagosDiversosStateProps } from './reducers/pagosDiversos';

const middlewares: Middleware[] = [];

const store = createStore(
  rootReducer(),
  // eslint-disable-next-line no-undefined
  undefined,
  compose(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);

export type RootState = {
  auth: AuthStateProps;
  app: AppStateProps;
  pagosDiversos: PagosDiversosStateProps;
};

export default store;
