import moment from 'moment';
import http from './http';

const getTiposDeSolicitudes = async (entidadMunicipalId) => {
  try {
    const response = await http.post('solicitudes/tipos-de-solicitudes/', {
      entidad_municipal: entidadMunicipalId,
    });
    return response?.data ?? [];
  } catch (error) {
    console.error(error);
  }
  return [];
};

const getSolicitudes = async (entidadMunicipalId) => {
  try {
    const response = await http.get('solicitudes/solicitudes/', {
      entidad_municipal: entidadMunicipalId,
    });
    return response?.data?.results ?? [];
  } catch (error) {
    console.error(error);
  }
  return [];
};

const registrarSolicitud = async (comentario,
  latitud,
  longitud,
  motivoDeLaSolicitud,
  entidadMunicipal) => {
  try {
    const response = await http.post('solicitudes/solicitudes/', {
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
    console.log(error?.response?.data);
  }

  return null;
};

const registrarArchivo = async (seguimientoId, archivo) => {
  try {
    const data = new FormData();
    data.append('archivo', archivo);
    data.append('seguimiento', seguimientoId);
    data.append('extension_del_documento', archivo.uri.substring(archivo.uri.lastIndexOf('.'), undefined));
    const response = await http.post('solicitudes/archivos-de-solicitudes/', data, {
      'content-type': 'multipart/form-data',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  getTiposDeSolicitudes,
  getSolicitudes,
  registrarSolicitud,
  registrarArchivo,
};