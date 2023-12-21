type RootStackParamList = {
  walkthrough: undefined;
  loginScreen: undefined;
  menuInicio: undefined;
  pagoPadron: {
    padron: {
      id: number;
      descripcion: string;
    }
  };
  pagoNetpay: {
    params: {
      total: unknown;
      folio: unknown;
      padron: unknown;
    }
  };
  terminos: undefined;
  pdfViewer: {
    datoParaRecibo: {
      total: number;
      fechaActual: string;
      nombre: string;
      lastName: string;
      numeroAut: string;
    };
  };
  netpaypago: {
    tipoDePadronId: number;
    padronId: number;
    cargoIds: number[];
    total: string | number;
    merchantReferenceCode: string;
  };
  cartografia: undefined;
  errorScreen: undefined;
  cobildo: undefined;
  webFacturacion: undefined;
  estrados: undefined;
  zonoficacion: {
    datosRecibo: {
      datosDePago: {
        total: unknown;
        folio: unknown;
        padron: unknown;
        token: string;
        clave: string;
        merchan: string;
      };
      nombre: string;
      apellidoPaterno: string;
      apellidoMaterno: string;
      phone: string;
      email: string;
      fecha: string;
      montoTotal: string;
      padronSeleccionado: string;
      folio: string;
    }
  },
  webTramites: {
    item: { id: string }
  }
};

export type {
  RootStackParamList,
};
