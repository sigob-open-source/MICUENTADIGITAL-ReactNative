type RawParams = Record<string, unknown | unknown[]>;
function formatQueryParams(params: RawParams) {
  const output: RawParams = {};

  const keys = Object.keys(params);
  keys.forEach((key) => {
    if (Array.isArray(params[key])) {
      output[`${key}[]`] = params[key];
    } else {
      output[key] = params[key];
    }
  });

  return output;
}

export default formatQueryParams;
