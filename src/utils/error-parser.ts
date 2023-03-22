// External dependencies
import { AxiosError } from 'axios';

// Internal dependencies
import { NormalizedAPIError } from '../types/api-ingresos';

function apiErrorParser(error: Error | AxiosError) {
  const output: NormalizedAPIError = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    message: error?.message ?? error?.response?.data?.detail ?? 'Error de servidor',
  };

  /* eslint-disable */
  // @ts-ignore
  if (error?.response?.status === 400) {
    /* eslint-enable */
    const typedError = error as AxiosError<Record<string, string[]>>;
    const data = typedError.response?.data || {};
    const keys = Object.keys(data);

    output.fields = {};

    keys.forEach((key) => {
      // eslint-disable-next-line
      // @ts-ignore
      output.fields[key] = Array.isArray(data[key])
        ? data[key][0]
        : (data[key] as unknown as string);
    });

    output.message = 'Formulario no válido';
  }

  return output;
}

export default apiErrorParser;
