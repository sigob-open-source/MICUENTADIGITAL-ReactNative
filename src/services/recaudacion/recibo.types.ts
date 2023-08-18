interface ITransactionDto {
  status: string;
  createdAt?: unknown;
  timeOut: string;
  orderId: string;
  merchantReferenceCode: string;
  spanRouteNumber: string;
  authCode: string;
  bankName: string;
  cardNature: string;
  merchantId?: unknown;
  promotion: string;
  eci: string;
  transactionTokenId: string;
  storeName?: unknown;
  responseCode: string;
}

interface ICard {
  token: string;
  expYear: string;
  expMonth: string;
  lastFourDigits: string;
  cardHolderName: string;
  brand: string;
  deviceFingerPrint: string;
  bank: string;
  type: string;
  country: string;
  scheme: string;
  cardPrefix: string;
  preAuth: boolean;
  vault: boolean;
  simpleUse: boolean;
}

interface IPaymentSource {
  cardDefault: boolean;
  card: ICard;
  source: string;
  type: string;
}

interface IAddress {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street1: string;
  street2?: unknown;
}

interface IBilling {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ipAddress?: unknown;
  merchantReferenceCode: string;
  address: IAddress;
}

interface INetPayResponse {
  amount: number;
  description?: unknown;
  status: string;
  redirect3dsUri: string;
  returnUrl?: unknown;
  paymentMethod: string;
  currency: string;
  createdAt: string;
  error?: unknown;
  transactionDto: ITransactionDto;
  reason?: unknown;
  responseMsg?: unknown;
  paymentSource: IPaymentSource;
  billing: IBilling;
  threeDSecure?: unknown;
  importe_sin_redondeo?: unknown;
}

interface IBase64File {
  id: number;
  name: string;
  ext: string;
  data: string;
}

interface GetReciboExternoResponse {
  id: number;
  importe_total: number;
  redondeo: number;
  observaciones?: string;
  folio: string;
  folio_de_facturacion: string;
  xml_archivo?: unknown;
  pdf_de_rfc?: unknown;
  fecha_de_cancelacion_o_devolucion?: string;
  observacion_de_la_cancelacion?: string;
  es_copia: boolean;
  content_type_padron: number;
  object_id_padron: number;
  usuario_que_cancelo?: unknown;
  recibo_cancelado?: unknown;
  concepto_de_acreditacion?: unknown;
  corte: ReciboExternoCorte;
  canal_de_pago: ReciboExternoCanalDePago;
  moneda: number;
  cuenta_unica: number;
  referencia_de_pago?: unknown;
  abonos: ReciboExternoAbono[];
  metodos_de_pago: number[];
  fecha_de_creacion: string;
  estados_globales: number;
}

interface ReciboExternoAbono {
  id: number;
  cargo: Cargo;
  estados_globales: number;
}

interface Cargo {
  id: number;
  total_real: number;
}

interface ReciboExternoCanalDePago {
  id: number;
  clave: string;
  catalogo_de_canal_de_pago: number;
  descripcion: string;
  tipo_de_pago?: unknown;
  estados_globales: number;
}

interface ReciboExternoCorte {
  id: number;
  apertura: string;
  cierre?: unknown;
  el_corte_requiere_retiro_de_caja: boolean;
  usuario_cajero: number;
  terminal_bancaria?: unknown;
  unidad_de_recaudacion: number;
  terminal_de_netpay?: unknown;
  estados_globales: number;
}

export type {
  IBase64File,
  ITransactionDto,
  ICard,
  IPaymentSource,
  IAddress,
  IBilling,
  INetPayResponse,
  GetReciboExternoResponse,
};
