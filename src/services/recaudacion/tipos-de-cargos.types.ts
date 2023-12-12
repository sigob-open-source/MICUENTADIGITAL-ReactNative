interface PeriodoProps {
  id: number;
  clave: string;
  descripcion: string;
  estados_globales: number;
}

interface PeriodoFiscalProps {
  id: number;
  periodo: number;
  identificador: number;
  fecha_inicial: string;
  fecha_final: string;
  fecha_autorizacion: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  documento_anexo_PDF?: unknown;
  documento_anexo_word?: unknown;
  vigente: boolean;
  determinables_aplicados: boolean;
  estados_globales: number;
}

interface TipoDeDato {
  id: number;
  clave: string;
  descripcion: string;
  es_para_formula: boolean;
  estados_globales: number;
}

interface PadronProps {
  id: number;
}

interface VariableProps {
  id: number;
  identificador: number;
  descripcion_de_variable: string;
  nombre_de_variable: string;
  tipo_de_variable: TipoDeDato;
  estados_globales: number;
}

interface TipoDeCargo {
  id: number;
  clave: string;
  descripcion: string;
  observaciones: string;
  parametro_descripcion: string;
  formula: string;
  importe?: unknown;
  importe_total?: null | number;
  importe_minimo: number;
  importe_maximo: number;
  es_convenio: boolean;
  es_cargo_unico: boolean;
  fecha_de_vencimiento?: unknown;
  es_accesorio: boolean;
  no_cargar_manualmente: boolean;
  no_aplica_descuento: boolean;
  es_cargo_no_requerible: boolean;
  es_facturable: boolean;
  es_responsabilidad: boolean;
  canales_de_pago: number[];
  identificador_periodo: number;
  tipo_de_cargo_padre?: unknown;
  moneda: number;
  tipo_de_aplicacion: number;
  catalogo_de_tarifa?: unknown;
  concepto_de_ingreso: number;
  periodo: PeriodoProps;
  periodo_fiscal: PeriodoFiscalProps;
  tipo_de_dato: TipoDeDato;
  tipos_de_recargo: unknown[];
  accesorios: unknown[];
  tipos_de_actualizacion: unknown[];
  tipos_de_descuento: number[];
  tipos_de_gasto: unknown[];
  padron: PadronProps;
  imprimir_observaciones: boolean;
  variables: VariableProps[];
  determinable_aplicado: boolean;
  categorias_de_cobro?: unknown;
  clasificador_de_tipo_de_cargo_en_portal: number;
  estados_globales: number;
  descripcion_corta?: unknown;
  permite_importe_en_cero: boolean;
}

export type {
  PadronProps,
  PeriodoFiscalProps,
  PeriodoProps,
  TipoDeCargo,
  TipoDeDato,
  VariableProps,
};
