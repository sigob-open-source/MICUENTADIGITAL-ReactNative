// Internal dependencies
import { AxiosError } from 'axios';
import Logger from '../../lib/logger';
import { PaginatedResult } from '../../types/api-ingresos';
import HTTP_GRP from '../http';
import { CiudadanoCajaProps, CiudadanoUpdatedProps } from './ciudadano-types';

type GetCiudadanoCajaParams = {
  q?: string;
  entidad: number;
};
const getCiudadanoCaja = async (params: GetCiudadanoCajaParams) => {
  let ciudadano: CiudadanoCajaProps | null = null;

  try {
    const response = await HTTP_GRP.get<PaginatedResult<CiudadanoCajaProps> | CiudadanoCajaProps[]>('cuentaunicasir/ciudadano-caja-public/', {
      params,
    });

    if (Array.isArray((response.data as PaginatedResult<CiudadanoCajaProps>)?.results)) {
      [ciudadano] = (response.data as PaginatedResult<CiudadanoCajaProps>)
        .results;
    } else if (Array.isArray(response.data)) {
      [ciudadano] = (response.data);
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'ciudadano.ts',
    });
  }

  return ciudadano;
};

type UpdateCiudadanoPayload = {
  email: string;
  lada: number;
  numero_de_celular: number;
};
type UpdateCiudadanoParams = {
  entidad: number;
};
const updateCiudadano = async (
  id: number,
  payload: Partial<UpdateCiudadanoPayload>,
  params: UpdateCiudadanoParams,
) => {
  let updated = false;

  try {
    const response = await HTTP_GRP.patch<CiudadanoUpdatedProps>(`cuentaunicasir/ciudadano-public/${id}/`, payload, {
      params,
    });

    updated = response.status === 200;
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      responseData: (error as AxiosError).response?.data,
      source: 'ciudadano.ts',
    });
  }

  return [updated];
};

export {
  getCiudadanoCaja,
  updateCiudadano,
};
