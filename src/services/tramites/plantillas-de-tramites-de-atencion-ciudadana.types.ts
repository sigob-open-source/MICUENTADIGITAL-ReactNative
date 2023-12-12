interface IUnidadOperativa {
  id: number;
  descripcion: string;
}

interface IDepartamento {
  id: number;
  clave: string;
  unidad_operativa: IUnidadOperativa;
  foliador_de_tramites: number;
  descripcion: string;
}

interface IUnidadDePlazoReal {
  id: number;
  descripcion: string;
  estados_globales: number;
}

interface INombreDeOrdenamiento {
  id: number;
  descripcion: string;
  fecha_de_publicacion: string;
  fecha_de_vigor: string;
  hipervinculo: string;
  tipo_de_ordenamiento: IUnidadDePlazoReal;
  ambito_de_ordenamiento: IUnidadDePlazoReal;
  estados_globales: number;
}

interface IFundamentoLegal {
  id: number;
  denominacion: string;
  articulo: string;
  fraccion?: unknown;
  inciso?: unknown;
  parrafo?: unknown;
  numero?: unknown;
  letra?: unknown;
  hipervinculo?: unknown;
  documento?: unknown;
  area_responsable?: unknown;
  fecha_publicacion?: string;
  otro?: unknown;
  otro_fundamento_legal?: unknown;
  nombre_de_ordenamiento: INombreDeOrdenamiento;
  normatividad?: unknown;
  estados_globales: number;
}

interface IMoneda {
  id: number;
  clave: string;
  descripcion: string;
  simbolo: string;
  decimales: number;
  porcentaje_de_variacion?: unknown;
  mostrar_en_pago: boolean;
  calculable: boolean;
  estados_globales: number;
}

interface IFundamentoLegalMonto {
  id: number;
  denominacion: string;
  articulo: string;
  fraccion?: unknown;
  inciso?: unknown;
  parrafo?: unknown;
  numero?: unknown;
  letra?: unknown;
  hipervinculo?: unknown;
  documento?: unknown;
  area_responsable?: unknown;
  fecha_publicacion: string;
  otro?: unknown;
  otro_fundamento_legal?: unknown;
  nombre_de_ordenamiento: INombreDeOrdenamiento;
  normatividad?: unknown;
  estados_globales: number;
}

interface IUnidadOperativa2 {
  id: number;
  nivel: number;
  foliador: number;
  director_de_la_dependencia?: unknown;
  clave: string;
  descripcion: string;
  portal_web?: unknown;
  tiene_equipo_de_computo: boolean;
  tiene_conexion_a_internet: boolean;
  tiene_area_de_espera: boolean;
  extension?: unknown;
  tipo_de_oficina?: unknown;
  horarios: unknown[];
  numero_de_telefono?: unknown;
  correo_electronico?: unknown;
  clasificaciones_programaticas: unknown[];
  clasificaciones_funcionales: unknown[];
  lada?: unknown;
  direccion?: unknown;
  folio_de_solicitud?: unknown;
  estados_globales: number;
}

interface IUnidadResponsable {
  id: number;
  clave: string;
  director_del_departamento?: unknown;
  unidad_operativa: IUnidadOperativa2;
  descripcion: string;
  portal_web?: unknown;
  tiene_equipo_de_computo: boolean;
  tiene_conexion_a_internet: boolean;
  tiene_area_de_espera: boolean;
  extension?: unknown;
  tipo_de_oficina?: unknown;
  horarios: unknown[];
  numero_de_telefono?: unknown;
  correo_electronico?: unknown;
  clasificaciones_programaticas: unknown[];
  clasificaciones_funcionales: unknown[];
  lada?: unknown;
  direccion?: unknown;
  foliador_de_tramites: number;
  estados_globales: number;
}

interface IHorario {
  id: number;
  entrada: string;
  salida: string;
  horario_de_entidad: boolean;
  dias_laborales: IUnidadDePlazoReal[];
  dias_de_descanso: number[];
  estados_globales: number;
}

interface IDireccion {
  calle_principal: string;
  numero_exterior: string;
  codigo_postal: number;
  tipo_de_vialidad: number;
  entre_calle: string;
  y_calle: string;
  numero_interior: string;
  descripcion_de_la_ubicacion: string;
  latitud: number;
  longitud: number;
  id: number;
  tipo_de_vialidad_entre: number;
  tipo_de_vialidad_y_calle?: unknown;
}

interface ICentroDeCosto {
  id: number;
  clave: string;
  unidad_responsable: IUnidadResponsable;
  jefe_de_recaudadora?: unknown;
  descripcion: string;
  portal_web?: unknown;
  tiene_equipo_de_computo: boolean;
  tiene_conexion_a_internet: boolean;
  tiene_area_de_espera: boolean;
  extension?: unknown;
  tipo_de_oficina: number;
  horarios: IHorario[];
  numero_de_telefono: number;
  correo_electronico: string;
  clasificaciones_programaticas: unknown[];
  clasificaciones_funcionales: unknown[];
  lada: number;
  direccion: IDireccion;
  estados_globales: number;
}

interface IPuestoPrincipal {
  id: number;
  descripcion: string;
  actividades_funcionarios: unknown[];
  estados_globales: number;
}

interface IFuncionario {
  id: number;
  puesto_principal: IPuestoPrincipal;
  puesto_secundario: unknown[];
}

interface IRol {
  id: number;
  name: string;
  permissions: number[];
  estados_globales?: unknown;
}

interface IUsuarioResponsableDeQueja {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  second_last_name: string;
  email: string;
  lada: number;
  numero_de_celular: number;
  numero_de_empleado?: unknown;
  funcionario: IFuncionario;
  funcion_del_usuario_externo?: unknown;
  roles: IRol[];
  canal_de_pago?: unknown;
  unidad_de_recaudacion?: unknown;
  estados_globales: number;
}

interface ITipoDePersona {
  id: number;
  clave: string;
  descripcion: string;
}

interface IUsuarioCreo {
  roles: unknown[];
}

interface ICanalDePresentacion {
  id: number;
  descripcion: string;
  proceso: number;
  estados_globales: number;
}

interface ICanalDePresentacionPlantilla {
  id: number;
  pasos_presenciales: string;
  pasos_por_otro_metodo: string;
  canal_de_presentacion: ICanalDePresentacion;
  fundamento_legal: unknown[];
  ubicacion?: string;
  plantilla_de_tramites: number;
  estados_globales: number;
}

interface IPlazoMaximo {
  id: number;
  plazo_maximo: number;
  observaciones?: unknown;
  tipo_de_ficta: IUnidadOperativa;
  unidad_de_plazo_maximo: IUnidadDePlazoReal;
}

interface IDocumentoDeSalidaDeTramite {
  id: number;
  folio?: unknown;
  descripcion?: unknown;
  formato_para_folio?: unknown;
  tipo_de_documento?: unknown;
  tipo_de_entrega_del_documento_de_salida?: unknown;
  otro_tipo_de_documento?: unknown;
  firmante?: unknown;
}

interface IEstado {
  id: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  nombre_de_AGEE: string;
  pais: IUnidadDePlazoReal;
}

interface IMunicipio {
  id: number;
  nom_mun: string;
  estado: IEstado;
}

interface ICodigoPostal {
  id: number;
  d_codigo: number;
  municipio: IMunicipio;
}

interface IDireccion2 {
  id: number;
  numero_exterior: string;
  numero_interior: string;
  calle_principal: string;
  entre_calle: string;
  y_calle: string;
  descripcion_de_la_ubicacion: string;
  latitud: number;
  longitud: number;
  tipo_de_vialidad: number;
  codigo_postal: ICodigoPostal;
  fecha_de_creacion: string;
  tipo_de_vialidad_entre: number;
  tipo_de_vialidad_y_calle?: unknown;
  estados_globales: number;
}

interface IOficinaDeAtencion {
  id: number;
  clave: string;
  unidad_responsable: number;
  jefe_de_recaudadora?: unknown;
  descripcion: string;
  portal_web?: unknown;
  tiene_equipo_de_computo: boolean;
  tiene_conexion_a_internet: boolean;
  tiene_area_de_espera: boolean;
  extension?: unknown;
  tipo_de_oficina: number;
  horarios: IHorario[];
  numero_de_telefono: number;
  correo_electronico: string;
  clasificaciones_programaticas: unknown[];
  clasificaciones_funcionales: unknown[];
  lada: number;
  direccion: IDireccion2;
  estados_globales: number;
}

interface IRequisito {
  id: number;
  cantidad_de_originales: number;
  cantidad_de_copias: number;
  observaciones: string;
  fundamento_legal: unknown[];
  tipo_de_requisito: IUnidadDePlazoReal;
}

interface ICasoDelRequisito {
  id: number;
  nombre: string;
  descripcion: string;
  requisitos: IRequisito[];
}

interface ICiterioDeResolucionDeTramite {
  id: number;
  criterio: string;
}

interface ITramite {
  id: number;
  nombre: string;
  descripcion: string;
  homoclave: string;
  nombre_interno_del_tramite: string;
  nombre_de_la_modalidad: string;
  departamentos: IDepartamento[];
  usuarios: unknown[];
  unidad_de_plazo_real: IUnidadDePlazoReal;
  plazo_real: number;
  calendario_de_presentacion: unknown[];
  meses_de_recurrencia: unknown[];
  volumen_anual?: unknown;
  volumen_de_consultas?: unknown;
  estado_de_ficha: IUnidadOperativa;
  tipos_de_cargos: unknown[];
  es_tramite_gratuito: boolean;
  descripcion_de_gratuito?: unknown;
  formato_para_folio?: unknown;
  fundamento_legal: IFundamentoLegal[];
  casos_de_presentacion: string;
  tipo_de_tramite: IUnidadDePlazoReal;
  clave_de_concepto?: unknown;
  es_concepto_interno: boolean;
  clave_de_computo?: unknown;
  es_cuota_fija: boolean;
  cuota_fija?: unknown;
  cuota_variable?: unknown;
  pago_de_multiples_tramites: boolean;
  periodicidad?: unknown;
  pago_continuo: boolean;
  pago_moral: boolean;
  aplica_iva: boolean;
  saldo_a_favor: boolean;
  parte_actualizada: boolean;
  recargos: boolean;
  multa_por_correccion: boolean;
  linea_capturada: boolean;
  vigencia_de_linea_de_captura?: unknown;
  moneda: IMoneda;
  otra_moneda?: unknown;
  fundamento_legal_monto: IFundamentoLegalMonto[];
  cuenta_con_sistema_de_gestion: boolean;
  nombre_del_sistema?: unknown;
  tecnologia_del_sistema: unknown[];
  otra_tecnologia_del_sistema?: unknown;
  adaptacion?: unknown;
  complejidad?: unknown;
  criticidad_del_sistema: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  disponibilidad_WS: boolean;
  peticiones: number;
  tramite_de_internet: boolean;
  anexo_de_documentos: boolean;
  seguimiento_por_internet: boolean;
  firma_electronica: boolean;
  pago_electronico: boolean;
  clave_rupa: boolean;
  necesita_sistema_back_office: boolean;
  resolucion_inmediata: boolean;
  transeferencia_de_fondos: boolean;
  constancia_de_notificacion: boolean;
  prestacion_de_servicio_publico: boolean;
  inspeccion_administrativa: boolean;
  revision_de_requisitos: boolean;
  devolucion_de_impuestos: boolean;
  requiere_pasos_posteriores: boolean;
  homoclave_interoperabilidad?: unknown;
  subida_de_documentos: boolean;
  cantidad?: unknown;
  descripcion_interoperabilidad?: unknown;
  presentacion?: unknown;
  dato_utilizado?: unknown;
  recepcion_electronica: boolean;
  acceso_electronico: boolean;
  otro_tipo_de_acceso?: unknown;
  almacenamiento_de_datos: boolean;
  proteccion_de_datos: boolean;
  proceso_interno?: unknown;
  formato_para_folio_interoperabilidad?: unknown;
  institucion_de_origen?: unknown;
  otra_institucion_de_origen?: unknown;
  tipo_de_documento?: unknown;
  otro_tipo_de_documento?: unknown;
  centro_de_costos: ICentroDeCosto[];
  cantidad_de_pasos_total?: unknown;
  cantidad_de_pasos_fuera?: unknown;
  razones_salir?: unknown;
  cantidad_de_documentos?: unknown;
  ambito_de_ordenamiento: IUnidadDePlazoReal;
  usuario_responsable_de_queja: IUsuarioResponsableDeQueja;
  usuario_responsable_de_la_resolucion?: unknown;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  usuario_supervisor_de_ROM?: unknown;
  notificacion_de_estatus: boolean;
  resolucion_por_internet: boolean;
  notificacion_de_informacion: boolean;
  notificacion_de_plazo: boolean;
  notificacion_de_vencimiento: boolean;
  agenda_cita: boolean;
  tipos_de_personas: ITipoDePersona[];
  metodologia_de_pago_para_calculo: string;
  programa_relacionado_a_tramite?: unknown;
  numero_de_resoluciones_favorables?: unknown;
  content_type_tramite?: unknown;
  object_id_tramite?: unknown;
  clasificacion: boolean;
  estado_de_la_empresa: string;
  resolucion_vinculada: boolean;
  resolucion_es_requisito: boolean;
  descripcion_de_pago: string;
  conservar_informacion: boolean;
  detalle_conservar_informacion: string;
  informacion_adicional: string;
  etapa_de_pago?: unknown;
  catalogo_de_canales_de_pago: unknown[];
  descripcion_de_monto_de_edicion?: unknown;
  donde_realizar_el_pago?: unknown;
  fecha_de_realizacion_de_pago?: unknown;
  fin_de_vigencia?: unknown;
  inicio_de_vigencia?: unknown;
  monto_calculado?: unknown;
  monto_fijo?: unknown;
  pagar_mas_de_un_tramite: boolean;
  pago_en_ventanilla: boolean;
  tipo_de_monto?: unknown;
  configuracion_de_padron?: unknown;
  tipos_de_persona_interesadas: IUnidadDePlazoReal[];
  pasos_para_tramites: unknown[];
  variables: unknown[];
  requisitos_generales: unknown[];
  es_propietario: boolean;
  estados_globales: number;
  usuario_creo: IUsuarioCreo;
  sinonimo?: unknown;
  canal_de_presentacion_plantilla: ICanalDePresentacionPlantilla[];
  plazo_prevencion?: unknown;
  plazo_maximo: IPlazoMaximo[];
  tipo_de_resolucion_plantilla?: unknown;
  criterio_de_resolucion_de_tramite?: unknown;
  comentario_general?: unknown;
  subsector_economico_de_plantilla?: unknown;
  familia_del_tramite_plantilla?: unknown;
  documento_de_salida_de_tramite: IDocumentoDeSalidaDeTramite[];
  cadena?: unknown;
  costeo_estandar?: unknown;
  oficina_de_atencion: IOficinaDeAtencion[];
  formato_requerido?: unknown;
  casos_de_los_requisitos: ICasoDelRequisito[];
  hecho_vital?: unknown;
  citerio_de_resolucion_de_tramite: ICiterioDeResolucionDeTramite[];
}

export type {
  ICanalDePresentacion,
  ICanalDePresentacionPlantilla,
  ICasoDelRequisito,
  ICentroDeCosto,
  ICiterioDeResolucionDeTramite,
  ICodigoPostal,
  IDepartamento,
  IDireccion,
  IDireccion2,
  IDocumentoDeSalidaDeTramite,
  IEstado,
  IFuncionario,
  IFundamentoLegal,
  IFundamentoLegalMonto,
  IHorario,
  IMoneda,
  IMunicipio,
  INombreDeOrdenamiento,
  IOficinaDeAtencion,
  IPlazoMaximo,
  IPuestoPrincipal,
  IRequisito,
  IRol,
  ITipoDePersona,
  ITramite,
  IUnidadDePlazoReal,
  IUnidadOperativa,
  IUnidadOperativa2,
  IUnidadResponsable,
  IUsuarioCreo,
  IUsuarioResponsableDeQueja,
};
