// Internal dependencies
import axios from 'axios';

import { IConsultaDeAdeudoResponse } from './types/consultaAdeudo';
import { APIMessage, GatedEndpointOptions } from './types/globals';

const consultaAdeudo = async (folio: string, options: GatedEndpointOptions) => {
  const response = await axios.get<IConsultaDeAdeudoResponse | APIMessage>('https://ingresosapi.juarez.gob.mx/api/predial/consultar-adeudo/', {
    params: {
      referencia: folio,
    },
    headers: {
      Authorization: `Bearer ${options.accessToken}`,
    },
  });

  if ('detail' in response.data) {
    throw new Error(response.data.detail);
  }

  if (response.status === 200) {
    return response.data;
  }

  return null;
};

export {
  consultaAdeudo,
};
