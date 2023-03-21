interface CargoProps {
  id: number;
  importe: number;
  descripcion: string;
  fecha_de_vencimiento?: string;
  saldado: boolean;
  content_type: number;
  object_id: number;
  tipo_de_cargo: number;
  cargo_padre?: number;
  observaciones: string;
  total_real: number;
  tramite?: number;
  estados_globales: number;
}

type CargoWithChildren = [CargoProps, { cargos_hijos: CargoProps[] }];

export type {
  CargoProps,
  CargoWithChildren,
};
