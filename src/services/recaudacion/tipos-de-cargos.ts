// Internal dependencies
import Logger from '../../lib/logger';
import { PaginatedResult } from '../../types/api-ingresos';
import formatQueryParams from '../../utils/formatQueryParams';
import HTTP_GRP from '../http';
import { TipoDeCargo } from './tipos-de-cargos.types';

interface GetTiposDeCargoParams {
  entidad: number;
  page: number;
  descripcion: string;
  canales_de_pago: number | number[];
  padron: number | number[];
  tipo_de_aplicacion: number | number[];
  es_accesorio: boolean;
  clasificador_de_tipo_de_cargo_en_portal: number | number[];
  identificadores: number | number[];
}

const getTiposDeCargo = async (params: Partial<GetTiposDeCargoParams> = {}) => {
  let output: TipoDeCargo[] = [];

  try {
    const response = await HTTP_GRP.get<PaginatedResult<TipoDeCargo> | TipoDeCargo[]>(
      'recaudacion/tipos-de-cargos-public/',
      {
        params: formatQueryParams(params),
      },
    );

    if (Array.isArray(response.data)) {
      output = response.data;
    } else {
      output = response.data.results ?? [];
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'tipos-de-cargos.ts',
    });
  }

  return output;
};

export {
  getTiposDeCargo,
};
