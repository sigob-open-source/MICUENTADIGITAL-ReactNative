// Internal dependencies
import axios from 'axios';
import { ObtenerTokenResponse } from './types/auth';
import { APIMessage } from './types/globals';

const obtenerToken = async () => {
  const response = await axios.post<ObtenerTokenResponse | APIMessage>('https://ingresosapi.juarez.gob.mx/api/token/obtener/', {
    username: 'api-sigob',
    password: 'coronado2023',
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if ('detail' in response.data) {
    throw new Error(response.data.detail);
  }

  return response.data;
};

export {
  obtenerToken,
};
