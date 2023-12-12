// Internal dependencies
import { AxiosError } from 'axios';

import Logger from '../../lib/logger';
import { MutationResult, PaginatedResult } from '../../types/api-ingresos';
import apiErrorParser from '../../utils/error-parser';
import formatQueryParams from '../../utils/formatQueryParams';
import HTTP_GRP from '../http';
import { CiudadanoCajaProps, CiudadanoMutationResult } from './ciudadano-types';

/**
 * Get Ciudadano
 */
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

/**
 * Create Ciudadano.
 */
type TCreateCiudadanoPayload = {
  CURP: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  lada: number;
  numero_de_celular: number;
  email: string;
  entidad: number[];
};

type TCreateCiudadanoParams = {
  entidad: number;
};

const createCiudadano = async (
  payload: TCreateCiudadanoPayload,
  params: TCreateCiudadanoParams,
) => {
  let output: MutationResult<CiudadanoMutationResult> = {
    errors: { message: 'Algo salió mal, intente más tarde.' },
    result: null,
    success: false,
  };

  try {
    const formattedParams = formatQueryParams(params);

    const response = await HTTP_GRP.post<CiudadanoMutationResult>('cuentaunicasir/ciudadano-public/', payload, {
      params: formattedParams,
    });

    if ([200, 201].includes(response.status) && response.data.id) {
      output = {
        errors: null,
        success: true,
        result: response.data,
      };
    }
  } catch (error) {
    const typedError = error as Error;

    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'ciudadano.ts',
    });

    output.errors = apiErrorParser(typedError);
  }

  return output;
};

/**
 * Update Ciudadano
 */
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
  let output: MutationResult<CiudadanoMutationResult> = {
    errors: { message: 'Algo salió mal, intente más tarde.' },
    result: null,
    success: false,
  };

  try {
    const response = await HTTP_GRP.patch<CiudadanoMutationResult>(`cuentaunicasir/ciudadano-public/${id}/`, payload, {
      params,
    });

    if (response.status === 200 && response.data.id) {
      output = {
        result: response.data,
        success: true,
        errors: null,
      };
    }
  } catch (error) {
    const typedError = error as Error;

    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      responseData: (error as AxiosError).response?.data,
      source: 'ciudadano.ts',
    });

    output.errors = apiErrorParser(typedError);
  }

  return output;
};

export {
  createCiudadano,
  getCiudadanoCaja,
  updateCiudadano,
};
