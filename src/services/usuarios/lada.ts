// Internal dependencies
import Logger from '../../lib/logger';
import { PaginatedResult } from '../../types/api-ingresos';
import HTTP_GRP from '../http';
import { LadaProps } from './lada.types';

const getLadas = async () => {
  let ladas: LadaProps[] | null = null;

  try {
    const response = await HTTP_GRP.get<PaginatedResult<LadaProps> | LadaProps[]>('usuarios/lada/');

    if (Array.isArray((response.data as PaginatedResult<LadaProps>)?.results)) {
      ladas = (response.data as PaginatedResult<LadaProps>)
        .results;
    } else if (Array.isArray(response.data)) {
      ladas = response.data;
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'lada.ts',
    });
  }

  return ladas;
};

export {
  getLadas,
};
