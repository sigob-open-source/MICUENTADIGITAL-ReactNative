/* eslint-disable @typescript-eslint/naming-convention */
import { XMLBadRequest, XMLScalarValue } from './xml-global';

enum StatusInfraccion {
  ACTIVA = 'ACTIVA',
  PAGADA = 'PAGADA',
  BAJA = 'BAJA',
  EBRIEDAD = 'EBRIEDAD',
  PERITOS = 'PERITOS',
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Encabezado {
  infraccion: XMLScalarValue<string>;
  fecha: XMLScalarValue<string>;
  folio: XMLScalarValue<string>;
  resultados: XMLScalarValue<string>;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Conductor {
  nombre: XMLScalarValue<string>;
  apaterno?: XMLScalarValue<string>;
  amaterno?: XMLScalarValue<string>;
  genero?: XMLScalarValue<string>;
  domicilio?: XMLScalarValue<string>;
  numext?: XMLScalarValue<string>;
  codigo_postal?: XMLScalarValue<string>;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Vehiculo {
  marca: XMLScalarValue<string>,
  modelo?: XMLScalarValue<string>,
  submarca?: XMLScalarValue<string>,
  color?: XMLScalarValue<string>,
  extranjero?: XMLScalarValue<string>,
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Motivo_Detalle {
  motivo: XMLScalarValue<string>;
  limite_descuento: XMLScalarValue<string>;
  descuento: XMLScalarValue<string>;
  descripcion: XMLScalarValue<string>;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Motivo {
  detalle: XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Motivo_Detalle;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Importe {
  importe_motivos: XMLScalarValue<string>;
  grua: XMLScalarValue<string>;
  gruaoperadora: XMLScalarValue<string>;
  hospedaje: XMLScalarValue<string>;
  smedico: XMLScalarValue<string>;
  recargos: XMLScalarValue<string>;
  total_infraccion: XMLScalarValue<string>;
  descuentos: XMLScalarValue<string>;
  gastos_cobranza: XMLScalarValue<string>;
  importe_total: XMLScalarValue<string>;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Referencia_Comerciales {
  oxxo: XMLScalarValue<string>;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Referencia {
  comerciales:
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Referencia_Comerciales;
  bancarias: XMLScalarValue<string>;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Base {
  infraccion: XMLScalarValue<string>;
  agente: XMLScalarValue<string>;
  fecha: XMLScalarValue<string>;
  placas: XMLScalarValue<string>;
  fecha_captura: XMLScalarValue<string>;
  estado?: XMLScalarValue<string>;
  municipio: XMLScalarValue<string>;
  calle_infraccion: XMLScalarValue<string>;
  calle_infraccion2: XMLScalarValue<string>;
  unidad: XMLScalarValue<string>;
  departamento: XMLScalarValue<string>;
  hospedaje: XMLScalarValue<string>;
  grua: XMLScalarValue<string>;
  estacion: XMLScalarValue<string>;
  sector: XMLScalarValue<string>;
  documento: XMLScalarValue<string>;
  observaciones?: XMLScalarValue<string>;
  gps?: XMLScalarValue<string>;
  licencia: XMLScalarValue<string>;
  conductor: XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Conductor;
  vehiculo: XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Vehiculo;
  motivos: XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Motivo;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Activa {
  status: XMLScalarValue<StatusInfraccion>;
  importes: XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Importe;
  referencias: XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Referencia;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Pagada {
  infraccion: XMLScalarValue<string>;
  status: XMLScalarValue<string>;
  fecha_pago: XMLScalarValue<string>;
}

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Generic
  extends XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Base {
  status: XMLScalarValue<string>;
}

type XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro =
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Pagada
  | XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Activa
  | XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Generic;

interface XMLConsultaInfraccion_InfraccionResponsePorInfraccion {
  ENCABEZADO: XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Encabezado;
  REGISTRO: XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro;
}

interface XMLConsultaInfraccion {
  INFRAREPXINFRACCION: XMLConsultaInfraccion_InfraccionResponsePorInfraccion;
}

interface ConsultaInfraccion__Base {
  folio: string;
  agente: string;
  fecha: string;
  placas: string;
  fechaCaptura: string;
  calleInfraccion: string;
  calleInfraccion2?: string;
  unidad: string,
  departamento: string,
  hospedaje: string,
  grua: string,
  estacion: string,
  sector: string,
  documento: string,
  observaciones?: string,
  gps?: string,
  licencia: string,
  conductor: {
    nombre: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    genero?: string;
    domicilio?: string;
    numeroExterior?: string;
    codigoPostal?: string;
  };
  vehiculo: {
    marca: string;
    modelo?: string;
    subMarca?: string;
    color?: string;
    extranjero?: string;
  };
  motivos: {
    motivo: string;
    limite_descuento: string;
    descuento: string;
    descripcion: string;
  }[];
}

interface ConsultaInfraccion_Generic extends ConsultaInfraccion__Base {
  status: StatusInfraccion;
}

interface ConsultaInfraccion_Activa extends ConsultaInfraccion__Base {
  status: StatusInfraccion.ACTIVA;
  importes: {
    importeMotivos: number;
    grua: number;
    gruaOperadora: number;
    hospedaje: number;
    servicioMedico: number;
    recargos: number;
    totalInfraccion: number;
    descuentos: number;
    gastosCobranza: number;
    importeTotal: number;
  };
  referencias: {
    comerciales: {
      oxxo: string;
    },
    bancarias: string;
  };
}

interface ConsultaInfraccion_Pagada {
  folio: string;
  status: StatusInfraccion.PAGADA;
  fechaPago: string;
}

type XMLConsultaInfraccionResponse = XMLConsultaInfraccion | XMLBadRequest;

type ConsultaInfraccion =
  ConsultaInfraccion_Generic
  | ConsultaInfraccion_Activa
  | ConsultaInfraccion_Pagada;

export type {
  ConsultaInfraccion,
  ConsultaInfraccion_Activa,
  ConsultaInfraccion_Generic,
  ConsultaInfraccion_Pagada,
  XMLConsultaInfraccion,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Encabezado,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Activa,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Base,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Generic,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro__Pagada,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Conductor,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Importe,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Motivo,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Motivo_Detalle,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Referencia,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Referencia_Comerciales,
  XMLConsultaInfraccion_InfraccionResponsePorInfraccion_Registro_Vehiculo,
  XMLConsultaInfraccionResponse,
};

export {
  StatusInfraccion,
};
