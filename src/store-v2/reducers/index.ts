// Internal dependencies
import pagosDiversos from './pagos-diversos';
import auth from './auth';

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
