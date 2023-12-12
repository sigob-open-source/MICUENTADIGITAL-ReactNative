interface EmpresaCiudadano {
  id: number;
  direccion?: unknown;
  email?: string;
  lada?: unknown;
  numero_de_celular?: number;
}

interface EmpresaCajaProps {
  id: number;
  es_informal: boolean;
  clave: string;
  nombre_comercial: string;
  nombre_del_gerente_propietario?: string;
  correo_electronico?: string;
  sitio_de_internet?: string;
  telefono_fijo?: string;
  lada_fijo?: number;
  telefono_celular?: string;
  lada_celular?: number;
  actividad_empresarial_especifica?: unknown;
  fecha_de_alta_de_padron_empresa?: string;
  fecha_de_apertura?: string;
  observaciones?: string;
  superficie_del_terreno?: unknown;
  superficie_construida_del_terreno?: unknown;
  numero_de_cajones_de_estacionamiento?: number;
  zona_de_carga_descarga?: unknown;
  unidad_recaudadora?: unknown;
  ciudadano: EmpresaCiudadano;
  contribuyente?: unknown;
  direccion_de_ubicacion?: unknown;
  predio?: unknown;
  clase_actividad_empresarial_principal?: unknown;
  sector_empresarial?: unknown;
  clasificacion_de_comercio?: unknown;
  tipo_de_establecimiento?: unknown;
  estados_globales: number;
  alerta?: unknown;
}

export type {
  EmpresaCajaProps,
  EmpresaCiudadano,
};
