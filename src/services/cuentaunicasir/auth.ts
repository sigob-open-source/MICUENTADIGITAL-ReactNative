// Internal dependencies
import Logger from '../../lib/logger';
import { DetailResponse, MutationResult } from '../../types/api-ingresos';
import apiErrorParser from '../../utils/error-parser';
import HTTP_GRP from '../http';
import { IObtenerAccesoResponse } from './auth.types';

type TSolicitarCodigoDeAccesoPayload = {
  lada: number;
  numero_de_celular: number;
};
/**
 * Dado un número de teléfono solicita un código
 * que podrá ser intercambiado por un access token.
 */
const solicitarCodigoDeAcceso = async (payload: TSolicitarCodigoDeAccesoPayload) => {
  let output: MutationResult<DetailResponse> = {
    errors: { message: 'Algo salió mal, intente más tarde.' },
    result: null,
    success: false,
  };

  try {
    const response = await HTTP_GRP.post<DetailResponse>('cuentaunicasir/auth/solicitar-codigo-de-acceso/', payload);

    if (response.status === 200 && response.data?.detail) {
      output = {
        success: true,
        errors: null,
        result: response.data,
      };
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      source: 'auth.ts',
      error: typedError,
    });

    output.errors = apiErrorParser(typedError);
  }

  return output;
};

interface IObtenerAccesoPayload {
  codigo: string;
  entidad: number;
  catalogo_canal_de_pago: number;
}

const obtenerAcceso = async (payload: IObtenerAccesoPayload) => {
  let output: MutationResult<IObtenerAccesoResponse> = {
    errors: { message: 'Algo salió mal, intente más tarde.' },
    result: null,
    success: false,
  };

  try {
    const response = await HTTP_GRP.post<IObtenerAccesoResponse>('cuentaunicasir/auth/obtener-acceso/', payload);

    if (response.status === 200 && response.data?.access_token) {
      output = {
        success: true,
        errors: null,
        result: response.data,
      };
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      source: 'auth.ts',
      error: typedError,
    });

    output.errors = apiErrorParser(typedError);
  }

  return output;
};

export {
  solicitarCodigoDeAcceso,
  obtenerAcceso,
};
