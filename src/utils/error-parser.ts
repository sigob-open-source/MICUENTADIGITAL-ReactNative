// External dependencies
import { AxiosError } from 'axios';

// Types & Interfaces
interface APIError {
  message: string;
  fields?: Record<string, string>;
}

function apiErrorParser(error: Error | AxiosError) {
  const output: APIError = {
    message: error?.message ?? 'Error de servidor',
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
