// Internal dependencies
import auth from './auth';
import pagosDiversos from './pagos-diversos';

const reducers = {
  pagosDiversos,
  auth,
};

type TReducers = typeof reducers;
type RootState = {
  [K in keyof TReducers]: ReturnType<TReducers[K]>;
};

export type {
  RootState,
};
export default reducers;
