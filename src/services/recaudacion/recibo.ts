// External dependencies
import HTTP_GRP from '../http';

// Internal dependencies
import Logger from '../../lib/logger';
import { INetPayResponse, IBase64File, GetReciboExternoResponse } from './recibo.types';
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
    console.log('este es el log de error', error.response.data);
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

interface GetReciboExternoParams {
  entidad: number;
  folio?: string;
  referencia_de_seguridad: string;
  id?: string;
  folio_de_facturacion?: string;
}

const getReciboExterno = async (params:GetReciboExternoParams) => {
  try {
    const payload = Object.keys(params).reduce((obj, key) => {
      const value = params[key as keyof GetReciboExternoParams] as (string | undefined);

      if (typeof value === 'string' && value.trim()) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = value.trim();
      } else if (typeof value !== 'string' && value) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = value;
      }
      return obj;
    }, {} as Record<string, string>);

    const response = await HTTP_GRP.get<GetReciboExternoResponse[]>('recaudacion/recibos-externo/', {
      params: payload,
    });

    if (Array.isArray(response.data) && response.data.length) {
      return response.data[0];
    }
  } catch (error) {
    const typedError = error as Error;

    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'recibo.ts',
    });
    console.log(error.response.data);
  }
  return null;
};

interface PostFacturacionParams {
  codigo_postal: string;
  email: string;
  entidad: number,
  fecha_de_pago: string,
  folio?: string,
  razon_social: string,
  regimen_fiscal: number,
  rfc: string,
  uso: number,
}

const postFacturar = async (params:PostFacturacionParams) => {
  try {
    const payload = Object.keys(params).reduce((obj, key) => {
      const value = params[key as keyof PostFacturacionParams] as (string | undefined);

      if (typeof value === 'string' && value.trim()) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = value.trim();
      } else if (typeof value !== 'string' && value) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = value;
      }
      return obj;
    }, {} as Record<string, string>);
    console.log('elputo params', payload);

    const response = await HTTP_GRP.post('recaudacion/facturacion-externa/', {
      params: payload,
    });

    return response.data;
  } catch (error) {
    const typedError = error as Error;

    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'recibo.ts',
    });
    console.log(error.response.data);
  }
  return null;
};

export {
  generarTicket,
  generateRecibo,
  getReciboExterno,
  postFacturar,
};
