interface XMLScalarValue<T = string> {
  _text: T;
}

interface XMLNoData {
  ERROR: XMLScalarValue<string>;
}

interface XMLBadRequest {
  NODATA: XMLNoData;
}

export type {
  XMLScalarValue,
  XMLBadRequest,
  XMLNoData,
};
