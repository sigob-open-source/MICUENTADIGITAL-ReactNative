// External dependencies
import { useSelector } from 'react-redux';

// Internal dependencies
import { RootState } from './types';

function useAppSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector);
}

export {
  useAppSelector,
};
