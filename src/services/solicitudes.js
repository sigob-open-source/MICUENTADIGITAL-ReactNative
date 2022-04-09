import moment from 'moment';
import { HTTP } from './http';

const getTiposDeSolicitudes = async (entidadMunicipalId) => {
  try {
    const response = await HTTP.post('solicitudes/tipos-de-solicitudes/', {
      entidad_municipal: entidadMunicipalId,
    });
    return response?.data ?? [];
  } catch (error) {
    console.error(error);
  }
  return [];
};

const getSolicitudes = async () => {
  try {
    const response = await HTTP.get('solicitudes/solicitudes/');
    return response?.data?.results ?? [];
  } catch (error) {
    console.error(error);
  }
  return [];
};

const registrarSolicitud = async (
  comentario,
  latitud,
  longitud,
  motivoDeLaSolicitud,
  entidadMunicipal,
) => {
  try {
    const response = await HTTP.post('solicitudes/solicitudes/', {
      comentario,
      latitud,
      longitud,
      motivo_de_la_solicitud: motivoDeLaSolicitud,
      entidad_municipal: entidadMunicipal,
      fecha_de_la_solicitud: moment().toISOString(),
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data);
  }

  return null;
};

export {
  getTiposDeSolicitudes,
  getSolicitudes,
  registrarSolicitud,
};
