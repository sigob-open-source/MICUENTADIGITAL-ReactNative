// Internal dependencies
import Logger from '../../lib/logger';
import HTTP_GRP from '../http';
import { CargoWithChildren } from './generar-cargos.types';

type VariablePayload = {
  variable_id: number;
  nombre_de_variable: string;
  valor: string;
};
type GenerarCargosPublicosConCanalDePagoPayload = {
  canal_de_pago: number;
  entidad: number;
  padron: number;
  padron_id: number;
  tipo_de_cargo: number;
  variables: VariablePayload[];
};
const generarCargosPublicosConCanalDePago = async (
  payload: GenerarCargosPublicosConCanalDePagoPayload,
) => {
  let output = null;

  try {
    const response = await HTTP_GRP.post<CargoWithChildren>(
      'recaudacion/generar-cargos-con-canal-de-pago/',
      payload,
      {
        params: {
          entidad: payload.entidad,
        },
      },
    );

    if (response.status === 200) {
      output = response.data;
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'generar-cargos.ts',
    });
  }

  return output;
};

export {
  generarCargosPublicosConCanalDePago,
};
