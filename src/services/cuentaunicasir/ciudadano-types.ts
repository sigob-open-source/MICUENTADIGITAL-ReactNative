interface CiudadanoCajaProps {
  id: number;
  clave_ciudadana: string;
  nombre_completo: string;
  es_ciudadano_considerado: boolean;
  tipo_de_considerado?: unknown;
  email?: string;
  CURP?: string;
  INE?: string;
  RFC?: string;
  numero_de_celular?: number;
  lada?: number;
  fecha_nacimiento?: string;
  direccion?: unknown;
  estados_globales: number;
  entidad: number[];
  alerta?: unknown;
}

interface CiudadanoMutationResult {
  id: number;
  CURP?: string;
  lada: number;
  email: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  numero_de_celular: number;
  entidad: number[];
  estados_globales: number;
}

export type {
  CiudadanoCajaProps,
  CiudadanoMutationResult,
};
