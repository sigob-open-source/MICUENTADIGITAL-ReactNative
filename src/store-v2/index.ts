// External dependencies
import { configureStore } from '@reduxjs/toolkit';

// Internal dependencies
import reducers from './reducers';

const store = configureStore({
  reducer: reducers,
});

export default store;
