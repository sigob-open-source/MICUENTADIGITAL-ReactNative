interface ContribuyenteCajaProps {
  id: number;
  clave: string;
  rfc: string;
  curp?: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo?: string;
  razon_social?: string;
  nombre_comercial?: string;
  correo_electronico: string;
  telefono_fijo?: string;
  telefono_celular?: number;
  misma_direccion_fiscal: boolean;
  fecha_de_alta_shcp?: string;
  registro_patronal_imss?: unknown;
  fecha_de_registro_patronal_imss?: string;
  fecha_de_alta_de_padron_estatal?: string;
  fecha_de_ultimo_movimiento?: string;
  fecha_de_constitucion?: string;
  estado_del_padron?: unknown;
  direcciones?: unknown;
  direcciones_de_notificacion?: unknown;
  tipo_de_persona: number;
  regimen_capital?: unknown;
  lada_fijo?: number;
  lada_celular?: number;
  ciudadano?: unknown;
  estados_globales: number;
  alerta?: unknown;
}

interface UpdatedContribuyenteProps {
  id: number;
  rfc: string;
  correo_electronico: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  tipo_de_persona: number;
  razon_social?: string;
  telefono_celular: number;
  entidad: number;
  lada_celular: number;
  regimen_capital?: unknown;
  estados_globales: number;
}

export type {
  ContribuyenteCajaProps,
  UpdatedContribuyenteProps,
};
