// Internal dependencies
import { MutationResult } from '../types/api-ingresos';

function mutation<TData>(apiHandler: () => Promise<MutationResult<TData>>) {
  const output: MutationResult<TData> = {
    errors: { message: 'Algo salió mal, intente más tarde' },
    result: null,
    success: false,
  };
}

export {
  mutation,
};
