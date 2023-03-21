// External dependencies
import storage from '@react-native-async-storage/async-storage';
import stateReconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistCombineReducers } from 'redux-persist';

// Reducers
import auth from './auth';
import app from './app';
import pagosDiversos from './pagosDiversos';

// Config
export const reducers = {
  auth,
  app,
  pagosDiversos,
};

export default () => persistCombineReducers(
  {
    key: 'root',
    storage,
    stateReconciler,
  },
  reducers,
);
