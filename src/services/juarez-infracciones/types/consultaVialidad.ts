/* eslint-disable @typescript-eslint/naming-convention */
import { XMLBadRequest, XMLScalarValue } from './xml-global';

enum TipoDeDocumentoConsulta {
  LICENCIA = 'licencia',
  PLACA = 'placa',
}

interface XMLConsultaLicencia_InfraccionResponsePorLicencia_Encabezado {
  licencia: XMLScalarValue<string>;
  fecha: XMLScalarValue<string>;
  folio: XMLScalarValue<string>;
  resultados: XMLScalarValue<string>;
}

interface XMLConsultaLicencia_InfraccionResponsePorLicencia_Infracciones_Infraccion {
  infraccion: XMLScalarValue<string>;
  fecha: XMLScalarValue<string>;
}

interface XMLConsultaLicencia_InfraccionResponsePorLicencia_Infracciones {
  INFRACCION: XMLConsultaLicencia_InfraccionResponsePorLicencia_Infracciones_Infraccion[];
}

interface XMLConsultaLicencia_InfraccionResponsePorLicencia {
  ENCABEZADO: XMLConsultaLicencia_InfraccionResponsePorLicencia_Encabezado;
  INFRACCIONES: XMLConsultaLicencia_InfraccionResponsePorLicencia_Infracciones;
}

interface XMLConsultaLicencia {
  INFRAREPXLICENCIA: XMLConsultaLicencia_InfraccionResponsePorLicencia;
}

interface XMLConsultaPlaca_InfraccionResponsePorPlaca_Encabezado {
  placa: XMLScalarValue<string>;
  fecha: XMLScalarValue<string>;
  folio: XMLScalarValue<string>;
  resultados: XMLScalarValue<string>;
}

interface XMLConsultaPlaca_InfraccionResponsePorPlaca_Infracciones_Registros {
  infraccion: XMLScalarValue<string>;
  fecha: XMLScalarValue<string>;
}

interface XMLConsultaPlaca_InfraccionResponsePorPlaca_Infracciones {
  REGISTRO: XMLConsultaPlaca_InfraccionResponsePorPlaca_Infracciones_Registros[];
}

interface XMLConsultaPlaca_InfraccionResponsePorPlaca {
  ENCABEZADO: XMLConsultaPlaca_InfraccionResponsePorPlaca_Encabezado;
  INFRACCIONES: XMLConsultaPlaca_InfraccionResponsePorPlaca_Infracciones;
}

interface XMLConsultaPlaca {
  INFRAREPXPLACA: XMLConsultaPlaca_InfraccionResponsePorPlaca;
}

type XMLConsulta = XMLConsultaPlaca | XMLConsultaLicencia | XMLBadRequest;

interface ConsultaResponse {
  folio: string;
  fecha: string;
}

export type {
  XMLConsultaLicencia_InfraccionResponsePorLicencia_Encabezado,
  XMLConsultaLicencia_InfraccionResponsePorLicencia_Infracciones_Infraccion,
  XMLConsultaLicencia_InfraccionResponsePorLicencia_Infracciones,
  XMLConsultaLicencia_InfraccionResponsePorLicencia,
  XMLConsultaLicencia,
  XMLConsultaPlaca_InfraccionResponsePorPlaca_Encabezado,
  XMLConsultaPlaca_InfraccionResponsePorPlaca_Infracciones_Registros,
  XMLConsultaPlaca_InfraccionResponsePorPlaca_Infracciones,
  XMLConsultaPlaca_InfraccionResponsePorPlaca,
  XMLConsultaPlaca,
  XMLConsulta,
  ConsultaResponse,
};

export {
  TipoDeDocumentoConsulta,
};
