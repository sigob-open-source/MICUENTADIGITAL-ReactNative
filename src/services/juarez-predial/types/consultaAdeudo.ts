/* eslint-disable @typescript-eslint/naming-convention */
interface IConsultaDeAdeudoResponse_Informacion {
  clave: string;
  propietario: string;
  domicilio: string;
}

interface IConsultaDeAdeudoResponse_AdeudoActual {
  impuesto_predial: string;
  impuesto_universitario: string;
  dap: string;
  fideicomiso: string;
  contribucion_extraordinaria: string;
}

interface IConsultaDeAdeudoResponse_Descuentos {
  descuento_cumplido: string;
  descuento_pronto_pago: string;
  descuento_senecto: string;
  descuento_recargo_rezago: string;
  descuento_discapacidad: string;
}

interface IConsultaDeAdeudoResponse_Desglose {
  adeudo_actual: IConsultaDeAdeudoResponse_AdeudoActual;
  recargos: IConsultaDeAdeudoResponse_AdeudoActual;
  rezago: IConsultaDeAdeudoResponse_AdeudoActual;
  recargo_rezago: IConsultaDeAdeudoResponse_AdeudoActual;
  descuentos: IConsultaDeAdeudoResponse_Descuentos;
}

interface IConsultaDeAdeudoResponse_Totales {
  total_descuentos: string;
  subtotal: string;
  total_gastos_de_cobranza: string;
  ajuste_redondeo: string;
  total: string;
}

interface IConsultaDeAdeudoResponse {
  aprobado: boolean;
  informacion: IConsultaDeAdeudoResponse_Informacion;
  desglose: IConsultaDeAdeudoResponse_Desglose;
  totales: IConsultaDeAdeudoResponse_Totales;
  folio: string;
}

export type {
  IConsultaDeAdeudoResponse,
  IConsultaDeAdeudoResponse_AdeudoActual,
  IConsultaDeAdeudoResponse_Descuentos,
  IConsultaDeAdeudoResponse_Desglose,
  IConsultaDeAdeudoResponse_Informacion,
  IConsultaDeAdeudoResponse_Totales,
};
