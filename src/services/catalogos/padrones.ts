// External dependencies
import Logger from '../../lib/logger';
import HTTP_GRP from '../http';
import { PadronProps } from './padrones.types';

interface GetPadronesParams {
  q?: string;
}

const getPadrones = async (params?: GetPadronesParams) => {
  let output: PadronProps[] = [];

  try {
    const response = await HTTP_GRP.get<PadronProps[]>('catalogos/padrones/', {
      params,
    });

    if (Array.isArray(response.data)) {
      output = response.data;
    }
  } catch (error) {
    const typedError = error as Error;
    Logger.error({
      event: 'api error',
      message: typedError?.message,
      error: typedError,
      source: 'padrones.ts',
    });
  }

  return output;
};

export {
  getPadrones,
};
