// External dependencies
import HTTP_GRP from '../http';

// Internal dependencies
import Logger from '../../lib/logger';
import { INetPayResponse, IBase64File } from './recibo.types';
import { MutationResult } from '../../types/api-ingresos';
import apiErrorParser from '../../utils/error-parser';

interface IGenerarReciboPayload {
  folio: string;
  canal_de_pago: number;
  response: INetPayResponse;
}

interface IGenerarReciboParams {
  entidad: number;
}

const generateRecibo = async (payload: IGenerarReciboPayload, params: IGenerarReciboParams) => {
  let output: MutationResult<IBase64File> = {
    errors: { message: 'Algo salió mal, intente más tarde' },
    result: null,
    success: false,
  };

  try {
    const response = await HTTP_GRP.post<IBase64File>('recaudacion/recibo/generar-recibo-por-referencia-de-pago-netpay/', payload, {
      params,
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
      source: 'recibo.ts',
    });

    output.errors = apiErrorParser(typedError);
  }

  return output;
};

interface IGenerarTicketPayload {
  recibos_id: number[];
  entidad_id: number;
  tramite_en_proceso: boolean;
}

interface IGenerarTicketParams {
  entidad: number;
}

const generarTicket = async (payload: IGenerarTicketPayload, params: IGenerarTicketParams) => {
  let output: MutationResult<IBase64File> = {
    errors: { message: 'Algo salió mal, intente más tarde' },
    result: null,
    success: false,
  };

  try {
    const response = await HTTP_GRP.post<IBase64File>('recaudacion/recibo-ticket-public/pdfs/', payload, {
      params,
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
      source: 'recibo.ts',
    });

    output.errors = apiErrorParser(typedError);
  }

  return output;
};

export {
  generarTicket,
  generateRecibo,
};
