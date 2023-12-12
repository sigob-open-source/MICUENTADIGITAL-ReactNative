/* eslint-disable no-underscore-dangle */
// Dependencies
import axios from 'axios';
import * as convert from 'xml-js';

import {
  ConsultaResponse,
  TipoDeDocumentoConsulta,
  XMLConsulta,
  XMLConsultaLicencia_InfraccionResponsePorLicencia_Infracciones_Infraccion,
  XMLConsultaPlaca_InfraccionResponsePorPlaca_Infracciones_Registros,
} from './types/consultaVialidad';

/**
 * Retorna la lista de infracciones asociadas a una licencia o a una placa vehicular.
 */
const consultaVialidad = async (tipoDeDocumento: TipoDeDocumentoConsulta, folio: string) => {
  const url = 'https://wstrans01.juarez.gob.mx/consulta.tcgi';

  const response = await axios.get<string>(url, {
    params: {
      [tipoDeDocumento]: folio,
    },
  });

  const rawData = convert.xml2js(response.data, {
    compact: true,
    ignoreComment: true,
    ignoreDeclaration: true,
  }) as XMLConsulta;

  if ('NODATA' in rawData) {
    throw new Error(rawData.NODATA.ERROR._text);
  }

  if ('INFRAREPXPLACA' in rawData) {
    const data = Array.isArray(rawData.INFRAREPXPLACA.INFRACCIONES.REGISTRO)
      ? rawData.INFRAREPXPLACA.INFRACCIONES.REGISTRO
      : [
        rawData
          .INFRAREPXPLACA
          .INFRACCIONES
          .REGISTRO as XMLConsultaPlaca_InfraccionResponsePorPlaca_Infracciones_Registros,
      ];

    return data.map<ConsultaResponse>((x) => ({
      fecha: x.fecha._text,
      folio: x.infraccion._text,
    }));
  }

  if ('INFRAREPXLICENCIA' in rawData) {
    const data = Array.isArray(rawData.INFRAREPXLICENCIA.INFRACCIONES.INFRACCION)
      ? rawData.INFRAREPXLICENCIA.INFRACCIONES.INFRACCION
      : [
        rawData
          .INFRAREPXLICENCIA
          .INFRACCIONES
          .INFRACCION as XMLConsultaLicencia_InfraccionResponsePorLicencia_Infracciones_Infraccion,
      ];

    return data.map<ConsultaResponse>((x) => ({
      fecha: x.fecha._text,
      folio: x.infraccion._text,
    }));
  }

  return [];
};

export {
  consultaVialidad,
};
