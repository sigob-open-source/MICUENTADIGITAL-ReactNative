interface ConsultaDeAdeudoResponse_Informacion {
  clave: string;
  propietario: string;
  domicilio: string;
}

interface ConsultaDeAdeudoResponse_AdeudoActual {
  impuesto_predial: string;
  impuesto_universitario: string;
  dap: string;
  fideicomiso: string;
  contribucion_extraordinaria: string;
}

interface ConsultaDeAdeudoResponse_Descuentos {
  descuento_cumplido: string;
  descuento_pronto_pago: string;
  descuento_senecto: string;
  descuento_recargo_rezago: string;
  descuento_discapacidad: string;
}

interface ConsultaDeAdeudoResponse_Desglose {
  adeudo_actual: ConsultaDeAdeudoResponse_AdeudoActual;
  recargos: ConsultaDeAdeudoResponse_AdeudoActual;
  rezago: ConsultaDeAdeudoResponse_AdeudoActual;
  recargo_rezago: ConsultaDeAdeudoResponse_AdeudoActual;
  descuentos: ConsultaDeAdeudoResponse_Descuentos;
}

interface ConsultaDeAdeudoResponse_Totales {
  total_descuentos: string;
  subtotal: string;
  total_gastos_de_cobranza: string;
  ajuste_redondeo: string;
  total: string;
}

interface ConsultaDeAdeudoResponse {
  aprobado: boolean;
  informacion: ConsultaDeAdeudoResponse_Informacion;
  desglose: ConsultaDeAdeudoResponse_Desglose;
  totales: ConsultaDeAdeudoResponse_Totales;
  folio: string;
}

export type {
  ConsultaDeAdeudoResponse_Informacion,
  ConsultaDeAdeudoResponse_AdeudoActual,
  ConsultaDeAdeudoResponse_Descuentos,
  ConsultaDeAdeudoResponse_Desglose,
  ConsultaDeAdeudoResponse_Totales,
  ConsultaDeAdeudoResponse,
};
