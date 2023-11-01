/* eslint-disable no-underscore-dangle */
// Dependencies
import axios from 'axios';
import * as convert from 'xml-js';
import {
  ConsultaInfraccion_Activa,
  ConsultaInfraccion_Generic,
  ConsultaInfraccion_Pagada,
  StatusInfraccion,
  XMLConsultaInfraccionResponse,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Motivo_Detalle,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Activa,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Generic,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Pagada,
} from './types/consultaInfraccion';

/**
 * Retorna la información detallada de una infracción.
 */

const consultaInfraccion = async (folio: string) => {
  const url = 'https://wstrans01.juarez.gob.mx/consulta.tcgi/';

  const response = await axios.get<string>(
    url,
    {
      params: {
        infraccion: folio,
      },
    },
  );

  /**
   * En ocasiones el API retorna un mensaje diciendo que ocurrió un error en lugar de un XML
   * por lo que debemos verificar que sea un xml antes de intentar convertirlo a JSON.
   */
  if (!String(response.data).toLowerCase().startsWith('<?xml')) return null;

  const rawData = convert.xml2js(response.data, {
    compact: true,
    ignoreComment: true,
    ignoreDeclaration: true,
  }) as XMLConsultaInfraccionResponse;

  /**
   * Retorna error si no se mandaron los datos requeridos por la petición.
   */
  if ('NODATA' in rawData) {
    throw new Error(rawData.NODATA.ERROR._text);
  }

  /**
   * Retorna null si no se encontró la infracción
   */
  if (!Object.keys(rawData.INFRAREPXINFRACCION.REGISTRO).length) {
    return null;
  }

  /**
   * La infracción pagada contiene información mínima.
   */
  if (rawData.INFRAREPXINFRACCION.REGISTRO.status._text === StatusInfraccion.PAGADA) {
    const typedRawData = rawData
      .INFRAREPXINFRACCION
      .REGISTRO as XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Pagada;

    const output: ConsultaInfraccion_Pagada = {
      folio: typedRawData.infraccion._text,
      fechaPago: typedRawData.fecha_pago._text,
      status: StatusInfraccion.PAGADA,
    };

    return output;
  }

  const typedGenericRawData = rawData
    .INFRAREPXINFRACCION
    .REGISTRO as XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Generic;

  const genericOutput: ConsultaInfraccion_Generic = {
    folio: typedGenericRawData.infraccion._text,
    status: typedGenericRawData.status._text as StatusInfraccion,
    agente: typedGenericRawData.agente._text,
    fecha: typedGenericRawData.fecha._text,
    placas: typedGenericRawData.placas._text,
    fechaCaptura: typedGenericRawData.fecha_captura._text,
    calleInfraccion: typedGenericRawData.calle_infraccion._text,
    calleInfraccion2: typedGenericRawData.calle_infraccion2?._text,
    unidad: typedGenericRawData.unidad._text,
    departamento: typedGenericRawData.departamento._text,
    hospedaje: typedGenericRawData.hospedaje._text,
    grua: typedGenericRawData.grua._text,
    estacion: typedGenericRawData.estacion._text,
    sector: typedGenericRawData.sector._text,
    documento: typedGenericRawData.documento._text,
    observaciones: typedGenericRawData.observaciones?._text,
    gps: typedGenericRawData.gps?._text,
    licencia: typedGenericRawData.grua._text,
    conductor: {
      nombre: typedGenericRawData.conductor.nombre?._text,
      apellidoPaterno: typedGenericRawData.conductor.apaterno?._text,
      apellidoMaterno: typedGenericRawData.conductor.amaterno?._text,
      genero: typedGenericRawData.conductor.genero?._text,
      domicilio: typedGenericRawData.conductor.domicilio?._text,
      numeroExterior: typedGenericRawData.conductor.numext?._text,
      codigoPostal: typedGenericRawData.conductor.codigo_postal?._text,
    },
    vehiculo: {
      marca: typedGenericRawData.vehiculo.marca._text,
      modelo: typedGenericRawData.vehiculo.modelo?._text,
      subMarca: typedGenericRawData.vehiculo.submarca?._text,
      color: typedGenericRawData.vehiculo.color?._text,
      extranjero: typedGenericRawData.vehiculo.extranjero?._text,
    },
    motivos: Array.isArray(typedGenericRawData.motivos.detalle)
      ? (typedGenericRawData
        .motivos
        .detalle as XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Motivo_Detalle[])
        .map((x) => ({
          motivo: x.motivo._text,
          limite_descuento: x.limite_descuento._text,
          descuento: x.descuento._text,
          descripcion: x.descripcion._text,
        })) : [
        {
          motivo: typedGenericRawData.motivos.detalle.motivo._text,
          limite_descuento: typedGenericRawData.motivos.detalle.limite_descuento._text,
          descuento: typedGenericRawData.motivos.detalle.descuento._text,
          descripcion: typedGenericRawData.motivos.detalle.descripcion._text,
        },
      ],
  };

  /**
   * La infracción por pagar retorna propiedades extra como importes y referencias
   */
  if (rawData.INFRAREPXINFRACCION.REGISTRO.status._text === StatusInfraccion.ACTIVA) {
    const typedRawData = rawData
      .INFRAREPXINFRACCION
      .REGISTRO as XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Activa;

    const output: ConsultaInfraccion_Activa = {
      ...genericOutput,
      status: StatusInfraccion.ACTIVA,
      importes: {
        importeMotivos: Number(typedRawData.importes.importe_motivos._text),
        grua: Number(typedRawData.importes.grua._text),
        gruaOperadora: Number(typedRawData.importes.gruaoperadora._text),
        hospedaje: Number(typedRawData.importes.hospedaje._text),
        servicioMedico: Number(typedRawData.importes.smedico._text),
        recargos: Number(typedRawData.importes.recargos._text),
        totalInfraccion: Number(typedRawData.importes.total_infraccion._text),
        descuentos: Number(typedRawData.importes.descuentos._text),
        gastosCobranza: Number(typedRawData.importes.gastos_cobranza._text),
        importeTotal: Number(typedRawData.importes.importe_total._text),
      },
      referencias: {
        comerciales: {
          oxxo: typedRawData.referencias.comerciales.oxxo._text,
        },
        bancarias: typedRawData.referencias.bancarias._text,
      },
    };

    return output;
  }

  return genericOutput;
};

export {
  consultaInfraccion,
};
