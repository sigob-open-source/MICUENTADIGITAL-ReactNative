// Internal dependencies
import Logger from '../../lib/logger';
import HTTP_GRP from '../http';
import { ReferenciasPagoNetpayPublic } from './pago.types';

interface BillingProps {
  canal_de_pago: number;
  cargos: number[];
  padron_id: number;
  tipo_de_padron: number;
  importe: number;
  fecha: string;
  merchantReferenceCode?: string | null;
  ciudadano: number | null;
}

interface GenerarReferenciaDePagoNetpayPublicPayload {
  description: string;
  expiryDate: string;
  amount: number;
  paymentMethod: string;
  currency: string;
  billing: BillingProps;
}

interface GenerarReferenciaDePagoNetpayPublicParams {
  entidad: number;
}

const generarReferenciaDePagoNetpayPublic = async (
  payload: GenerarReferenciaDePagoNetpayPublicPayload,
  params: GenerarReferenciaDePagoNetpayPublicParams,
) => {
  let output = null;

  try {
    const response = await HTTP_GRP.post<ReferenciasPagoNetpayPublic>(
      'recaudacion/referencias-pago-netpay-public/',
      payload,
      {
        params,
      },
    );

    if (response.status === 200) {
      output = response.data;
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError.message,
      error: typedError,
      source: 'pago.ts',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line
      response: JSON.stringify(typedError.response.data),
      fecha: payload.billing.fecha,
    });
  }

  return output;
};

export {
  generarReferenciaDePagoNetpayPublic,
};
