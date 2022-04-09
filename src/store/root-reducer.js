// Dependencies
import storage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import hardset from 'redux-persist/lib/stateReconciler/hardSet';

// Reducers
import auth from './reducers/auth';
import app from './reducers/app';

const config = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  stateReconcilier: hardset,
};

export default () => persistCombineReducers(config, {
  auth,
  app,
});
