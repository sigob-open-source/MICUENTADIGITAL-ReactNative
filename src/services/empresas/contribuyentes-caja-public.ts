// Internal dependencies
import Logger from '../../lib/logger';
import { MutationResult, PaginatedResult } from '../../types/api-ingresos';
import apiErrorParser from '../../utils/error-parser';
import HTTP_GRP from '../http';
import { ContribuyenteCajaProps, UpdatedContribuyenteProps } from './contribuyentes-caja-public-types';

type GetEmpresaCajaParams = {
  q?: string;
  entidad: number;
};
const getContribuyenteCaja = async (params: GetEmpresaCajaParams) => {
  let empresa: ContribuyenteCajaProps | null = null;

  try {
    const response = await HTTP_GRP.get<PaginatedResult<ContribuyenteCajaProps> | ContribuyenteCajaProps[]>('empresas/contribuyentes-caja-public/', {
      params,
    });

    if (Array.isArray((response.data as PaginatedResult<ContribuyenteCajaProps>)?.results)) {
      [empresa] = (response.data as PaginatedResult<ContribuyenteCajaProps>)
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
      source: 'contribuyente-caja-public.ts',
    });
  }

  return empresa;
};

type UpdateContribuyetePayload = {
  correo_electronico: string;
  lada_celular: number;
  telefono_celular: number;
};
type UpdateContribuyeteParams = {
  entidad: number;
};
const updateContribuyete = async (
  id: number,
  payload: Partial<UpdateContribuyetePayload>,
  params: UpdateContribuyeteParams,
) => {
  let output: MutationResult<UpdatedContribuyenteProps> = {
    errors: { message: 'Algo salió mal, intente más tarde.' },
    result: null,
    success: false,
  };

  try {
    const response = await HTTP_GRP.patch<UpdatedContribuyenteProps>(
      `empresas/contribuyentes-caja-public/${id}/`,
      payload,
      {
        params,
      },
    );

    if (response.status === 200 && response.data) {
      output = {
        success: true,
        result: response.data,
        errors: null,
      };
    }
  } catch (error) {
    const typedError = error as Error;

    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'contribuyente-caja-public.ts',
    });

    output.errors = apiErrorParser(typedError);
  }

  return output;
};

export {
  getContribuyenteCaja,
  updateContribuyete,
};
