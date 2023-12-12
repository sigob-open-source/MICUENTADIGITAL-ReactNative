/* eslint-disable consistent-return */
import type { AxiosError } from 'axios';

import { HTTP } from './http';

const getReferencia = async (
  importe: unknown,
  cargos: unknown,
  padronId: number,
  tipoDePadronId:number,
) => {
  try {
    const response = await HTTP.post('/recaudacion/generar-referencia-pago-netpay/', {
      importe,
      cargos,
      padron_id: padronId,
      tipo_de_padron_id: tipoDePadronId,
      entidad_municipal_id: 1,
    });

    if (response?.status === 201) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    }
  } catch (error) {
    const typedError = error as AxiosError;

    console.log(typedError);
    console.log(typedError.response?.data);
  }
};

interface IClasificadorDeTiposDeCargos {
  id: number;
  nombre: string;
  clasificador: string;
  tipo_de_padron: unknown[];
  icono?: unknown;
  entidad: number;
}

type TGetClasificadoresDeTipoDeCargoPortalPublicoResponse = IClasificadorDeTiposDeCargos[];

const getClasificadoresDeTipoDeCargoPortalPublico = async (entidadId: number) => {
  try {
    const response = await HTTP.get<TGetClasificadoresDeTipoDeCargoPortalPublicoResponse>('/recaudacion/clasificadores-de-tipos-de-cargo-portal-public/', {
      params: {
        entidad: entidadId,
      },
    });

    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }

  return [];
};

export type {
  IClasificadorDeTiposDeCargos,
};
export {
  getClasificadoresDeTipoDeCargoPortalPublico,
  getReferencia,
};
