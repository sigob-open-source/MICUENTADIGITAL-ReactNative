// Internal dependencies
import Logger from '../../lib/logger';
import { PaginatedResult } from '../../types/api-ingresos';
import HTTP_GRP from '../http';
import { EmpresaCajaProps } from './empresa-types';

type GetEmpresaCajaParams = {
  q?: string;
  entidad: number;
};
const getEmpresaCaja = async (params: GetEmpresaCajaParams) => {
  let empresa: EmpresaCajaProps | null = null;

  try {
    const response = await HTTP_GRP.get<PaginatedResult<EmpresaCajaProps> | EmpresaCajaProps[]>('cuentaunicasir/empresas-caja-atencion-ciudadana/', {
      params,
    });

    if (Array.isArray((response.data as PaginatedResult<EmpresaCajaProps>)?.results)) {
      [empresa] = (response.data as PaginatedResult<EmpresaCajaProps>)
        .results;
    } else if (Array.isArray(response.data)) {
      [empresa] = (response.data);
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'empresa.ts',
    });
  }

  return empresa;
};

export {
  getEmpresaCaja,
};
