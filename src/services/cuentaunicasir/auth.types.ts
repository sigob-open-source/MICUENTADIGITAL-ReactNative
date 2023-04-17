interface ICiudadano {
  id: number;
  clave_ciudadana: string;
  foto?: string;
  CURP: string;
  INE?: string;
  RFC?: string;
  fecha_nacimiento?: string;
  email: string;
  nombre: string;
  apellido_paterno: string;
  es_ciudadano_considerado: boolean;
  apellido_materno: string;
  email_alternativo?: string;
  numero_de_celular: number;
  lada: number;
  numero_verificado: boolean;
  tipo_de_considerado?: string;
  direccion?: unknown;
  estado_civil?: unknown;
  genero?: unknown;
  estados_globales: number;
}

interface IObtenerAccesoResponse {
  ciudadano: ICiudadano;
  access_token: string;
}

export type {
  ICiudadano,
  IObtenerAccesoResponse,
};
