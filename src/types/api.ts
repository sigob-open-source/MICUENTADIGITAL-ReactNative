import { AxiosError } from 'axios';

interface CommonResponse {
  status: boolean;
  message?: string;
  data?: unknown;
}

interface _Error extends Partial<Error> {
  message: string;
}

type ApiError = AxiosError<CommonResponse> | _Error;

interface ReferenciaBancariaBBVA {
  url_multipagos: string;
  s_transm: string;
  c_referencia: string;
  t_servicio: string;
  t_importe: string;
  s_desc: string;
  s_ori: string;
  s_desc1: string;
  s_desc2: string;
  i_aport: string;
  val_1: string;
  val_2: string;
  sel_bank: string;
  r_bancaria: string;
}

interface ReferenciaEcommerce {
  amount: string;
  id: string;
}

interface AdeudoProps {
  IDENTIFICADOR: string;
  TITULO: string;
  AXO: string;
  BIMESTRE: string;
  VALFISCAL: string;
  TASA: string;
  IMPUESTO: string;
  RECARGOS: string;
  ACTUALIZACION: string;
  TOTAL: string;
}

interface PredioProps {
  Recaudadora: string;
  Tipo: string;
  Cuenta: string;
  Estatus: string;
  EstatusMensaje: string;
  ClaveCatastral: string;
  IdCuenta: string;
  Calle: string;
  Colonia: string;
  NoExterior: string;
  NoInterior: string;
  MtsTerreno: string;
  MtsConstruccion: string;
  ValorTerreno: string;
  ValorConstruccion: string;
  ValorCatastral: string;
  LugarPago: string;
  MensajeAfectacion: string;
  MensajeSubsidios: string;
  MensajeFechaLimite: string;
  web_estatus: string;
  fecha_limite: string;
  presupuesto: boolean;
  presupuesto_params_encriptado: string;
  presupuesto_url: string;
  icebl: string;
  linea_captura: string;
  bar_code: string;
  adeudos: AdeudoProps[];
  bbva: ReferenciaBancariaBBVA;
  ecommerce: ReferenciaEcommerce;
}

interface ConsultaAdedudoResponse extends CommonResponse {
  data: PredioProps;
}

export type {
  ApiError,
  CommonResponse,
  ConsultaAdedudoResponse,
  PredioProps,
  ReferenciaBancariaBBVA,
  ReferenciaEcommerce,
};
