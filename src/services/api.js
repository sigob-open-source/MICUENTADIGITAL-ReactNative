import moment from 'moment';
import {
  Alert,
} from 'react-native';
import http from './http';

const controller = new AbortController();

const getTiposDeSolicitudes = async (entidadMunicipalId) => {
  try {
    const response = await http.post('solicitudes/tipos-de-solicitudes/', {
      entidad_municipal: entidadMunicipalId,
      signal: controller.signal,
    });
    return response?.data ?? [];
  } catch (error) {
    console.log('ERROR: ', error);
    controller.abort();
    Alert.alert('Error', 'No se ha podido comunicar con el servidor. Favor de intentarlo más tarde.');
  }
  return [];
};

const getSolicitudes = async (entidadMunicipalId, page) => {
  try {
    const response = await http.get(`solicitudes/solicitudes/?page=${page}`, {
      entidad_municipal: entidadMunicipalId,
    });
    return response?.data?.results ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getOficinas = async () => {
  try {
    const response = await http.get('configuracion/unidades-de-recaudacion-public/', {
      signal: controller.signal,
    });
    return response?.data?.results ?? [];
  } catch (error) {
    controller.abort();
  }
};

const getOficinasDeAtencion = async (params) => {
  try {
    const response = await API.get('/configuracion/caar-public/', { params });
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

const getDependencias = async () => {
  try {
    const response = await http.get('/configuracion/dependencias-public/', {
      signal: controller.signal,
    });
    return response?.data ?? [];
  } catch (error) {
    controller.abort();
  }
};

const getTramites = async (page) => {
  try {
    const response = await http.get(`tramites/plantillas-tramites-atencion-ciudadana/?page=${page}`, {
      signal: controller.signal,
    });
    return response?.data ?? [];
  } catch (error) {
    controller.abort();
  }
};

const getFuncionarios = async () => {
  try {
    const response = await http.get('usuarios/funcionario-public/', {
      signal: controller.signal,
    });
    return response?.data ?? [];
  } catch (error) {
    controller.abort();
  }
};

const registrarSolicitud = async (
  comentario,
  latitud,
  longitud,
  motivoDeLaSolicitud,
  entidadMunicipal,
) => {
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
  getOficinas,
  getFuncionarios,
  getDependencias,
  getTramites,
};
