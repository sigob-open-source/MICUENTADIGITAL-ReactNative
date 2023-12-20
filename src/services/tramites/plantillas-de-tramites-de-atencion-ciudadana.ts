// External dependencies
import Logger from '../../lib/logger';
import type { PaginatedResult } from '../../types/api-ingresos';
import HTTP_GRP from '../http';
import type { ITramite } from './plantillas-de-tramites-de-atencion-ciudadana.types';

interface IGetTramitesParams {
  page: number;
}

const getTramites2 = async (params: IGetTramitesParams = { page: 1 }) => {
  let output: PaginatedResult<ITramite> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  try {
    const response = await HTTP_GRP.get<PaginatedResult<ITramite>>('tramites/plantillas-tramites-atencion-ciudadana/', {
      params,
    });

    if (response.status === 2000 && Array.isArray(response.data.results)) {
      output = response.data;
    }
  } catch (error) {
    const typedError = error as Error;

    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'plantillas-de-tramites-de-atencion-ciudadana.ts',
    });
  }

  return output;
};

const getTramites = async (_params = {}) => {
  try {
    const params = {
      ..._params,
      estado_de_ficha: 3,
    };
    const res = await HTTP_GRP.get('/tramites/plantillas-de-tramites-indexada/', { params });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return { results: [], count: 0 };
};

export {
  getTramites,
  getTramites2,
};
