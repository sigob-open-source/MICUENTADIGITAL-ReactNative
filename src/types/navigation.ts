import { TipoDeCargo } from '../services/recaudacion/tipos-de-cargos.types';
import type { ITramite } from '../services/tramites/plantillas-de-tramites-de-atencion-ciudadana.types';

type RootStackParamList = {
  walkthrout: undefined;
  infoServidorPublico: undefined;
  tipoDeRegistro: undefined;
  pdfViewer: {
    reciboB64: string;
  };
  informacionQueja: undefined;
  archivosDeQuejas: undefined;
  loginScreen: undefined;
  informacionRecibo: undefined;
  informacionFiscal: undefined;
  registroCiudadano?: {
    lada: string;
    numeroDeTelefono: string;
  };
  inicioFactura: undefined;
  otrosPagos: undefined;
  netpaypago: {
    tipoDePadronId: number;
    padronId: number;
    cargoIds: number[];
    total: string | number;
    merchantReferenceCode: string;
  };
  cartografia: undefined;
  zonoficacion: undefined;
  cobildo: undefined;
  convocatorias: undefined;
  webTramites: {
    item: ITramite;
  };
  webAdeudos: undefined;
  webFacturacion: undefined;
  estrados: undefined;
  home: undefined;
  menuInicio: undefined;
  peticiones: undefined;
  solicitud: undefined;
  pagos: undefined;
  tramites: undefined;
  dirfuncionario:undefined;
  oficinaAtencion:undefined;
  solicitudSelect: undefined;
  verSolicitud:undefined;
  verSolicitudes:undefined;
  problemOneScreen: undefined;
  problemTwoScreen: undefined;
  problemThreeScreen: undefined;
  problemFourScreen: undefined;
  pagoPadron: undefined;
  detallesPadron: undefined;
  netpayCustom: undefined;
  pagoRealizado: undefined;
  registroScreen: undefined;
  codigoScreen: undefined;
  /* Pagos diversos */
  seleccionarTipoDePadron: undefined;
  busquedaPadron: undefined;
  confirmarPadron: undefined;
  busquedaDeCargos: undefined;
  configuracionDeCargo: {
    tipoDeCargo: TipoDeCargo;
  };
  resumenDeCargos: undefined;
  resumenDePago: undefined;
};

export type {
  RootStackParamList,
};
