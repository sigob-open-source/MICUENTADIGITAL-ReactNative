import API from './http';

const PADRON_DESCRIPTIONS_MAP = Object.freeze({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  11: 'Juegos de Azar',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  13: 'Casa de empeño',
});

const getPadrones = async (params: Record<string, string> = {}) => {
  try {
    const response = await API.get<{ id: number; descripcion: string }[]>('catalogos/padrones', { params });

    return response.data.filter((e) => e.id !== 5)
      .map((e) => ({
        ...e,
        descripcion: PADRON_DESCRIPTIONS_MAP[
          e.id as keyof (typeof PADRON_DESCRIPTIONS_MAP)
        ] || e.descripcion,
      }));
  } catch (error) {
    console.log(error);
  }
  return [];
};

export {
  getPadrones,
};
