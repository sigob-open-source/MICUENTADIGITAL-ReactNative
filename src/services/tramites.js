import { HTTP } from './http';

export const getTramites = async (entidadMunicipalId) => {
  try {
    const response = await HTTP.get('tramites/plantillas-tramites-atencion-ciudadana/', {
      params: {
        entidad_municipal: entidadMunicipalId,
      },
    });
    return response?.data ?? [];
  } catch (error) {
    console.error(error);
  }
  return [];
};

export default getTramites;
