import Moment from 'moment';
import { toCurrency, toMoment } from '../utils/formatters';
import API from './http';

Moment.defaultFormat = 'DD/MM/YYYY';
const DATE_FORMAT = 'DD-MM-YYYY';

const PADRON_DESCRIPTIONS_MAP = Object.freeze({
  11: 'Juegos de Azar',
  13: 'Casa de empeño',
});

// const getPadrones = async () => {
//   await http.get('catalogos/padrones/').then(
//     (response) => {
//       const result = response.data;
//       return result;
//     },
//     (error) => {
//       console.log(error);
//     },
//   );
// };

export const postGenererReferenciasNetpay = async (tipoDePadron, padron, cargos, padrones) => {
  try {
    const importe = cargos.reduce((acum, curr) => acum + curr.importe, 0);
    const values = {
      description: cargos.length === 1
        ? cargos[0].descripcion : padrones.find((p) => p.id === tipoDePadron)?.descripcion,
      expiryDate: toMoment(new Date()).add(1, 'days').format('YYYY/MM/DD'),
      amount: importe,
      paymentMethod: 'cash',
      currency: 'MXN',
      billing: {
        canal_de_pago: 3,
        cargos: cargos.map((e) => e.id),
        padron_id: padron.id,
        tipo_de_padron: tipoDePadron,
        importe,
        fecha: toMoment(new Date()).format(DATE_FORMAT),
        merchantReferenceCode: null,
        ciudadano: null,
      },
    };
    console.log(JSON.stringify(values));
    const response = await API.post('recaudacion/referencias-pago-netpay-public/', values);
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error.response.data), true);
  }
  return null;
};

const getPadrones = async (params) => {
  try {
    const response = await API.get('catalogos/padrones', { params });
    return response.data.filter((e) => e.id !== 5)
      .map((e) => ({ ...e, descripcion: PADRON_DESCRIPTIONS_MAP[e.id] || e.descripcion }));
  } catch (error) {
    console.log(error);
  }
  return [];
};

const getTipoDePadron = (padron) => {
  if (padron.empresa?.contribuyente?.id
    || padron.contribuyente?.id
    || padron.contribuyente_propietario?.id) {
    return 15;
  }
  return 1;
};

const validateResut = (_data, tipoDePadron) => {
  const data = _data?.results || _data || [];
  if (data.length === 1) {
    return {
      ...data[0],
      idPadronUpdate: data[0]?.empresa?.contribuyente?.id || data[0]?.empresa?.ciudadano?.id
      || data[0]?.contribuyente?.id || data[0]?.ciudadano?.id
      || data[0]?.contribuyente_propietario?.id || data[0]?.propietario?.id || data[0].id,
      tipoDePadronNeedsInfo: [1, 15].includes(tipoDePadron)
        ? tipoDePadron : getTipoDePadron(data[0]),
    };
  }
  return null;
};

const getCiudadano = async (params) => {
  try {
    const response = await API.get('cuentaunicasir/ciudadano-caja-public', { params });
    return validateResut(response.data, 1);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getEmpresa = async (params) => {
  try {
    const response = await API.get('cuentaunicasir/empresas-caja-atencion-ciudadana/', { params });
    return validateResut(response.data, 2);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getPredio = async (params) => {
  try {
    const response = await API.get('cuentaunicasir/predio-caja-atencion-ciudadana/', { params });
    return validateResut(response.data, 3);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getVehiculo = async (params) => {
  try {
    const response = await API.get('cuentaunicasir/vehiculos-caja-atencion-ciudadana', { params });
    return validateResut(response.data, 4);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getHospedaje = async (params) => {
  try {
    const response = await API.get('empresas/hospedaje-caja-public/', { params });
    return validateResut(response.data, 6);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getArrendamiento = async (params) => {
  try {
    const response = await API.get('empresas/arrendamiento-caja-public/', { params });
    return validateResut(response.data, 7);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getNomina = async (params) => {
  try {
    const response = await API.get('empresas/nomina-caja-public/', { params });
    return validateResut(response.data, 8);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getAlcohol = async (params) => {
  try {
    const response = await API.get('empresas/alcohol-caja-public/', { params });
    return validateResut(response.data, 9);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getCedular = async (params) => {
  try {
    const response = await API.get('empresas/cedular-caja-public/', { params });
    return validateResut(response.data, 10);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getJuegoDeAzar = async (params) => {
  try {
    const response = await API.get('empresas/juego-de-azar-caja-public/', { params });
    return validateResut(response.data, 11);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getNotario = async (params) => {
  try {
    const response = await API.get('empresas/notario-caja-public/', { params });
    return validateResut(response.data, 12);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getCasaDeEmpenio = async (params) => {
  try {
    const response = await API.get('empresas/casa-de-empenio-caja-public/', { params });
    return validateResut(response.data, 13);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getAgencia = async (params) => {
  try {
    const response = await API.get('empresas/agencia-caja-public/', { params });
    return validateResut(response.data, 14);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getContribuyente = async (params) => {
  try {
    const response = await API.get('empresas/contribuyentes-caja-public/', { params });
    return validateResut(response.data, 15);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMotocicleta = async (params) => {
  try {
    const response = await API.get('recaudacion/motocicletas-caja-public/', { params });
    return validateResut(response.data, 16);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getAdeudoPadron = async (padron, numeroPadron) => {
  let result;
  if (padron !== undefined && padron !== null) {
    await API
      .post('recaudacion/consulta-caja-public/entidad/', {
        padron_id: padron?.id,
        padron: numeroPadron,
        canal_de_pago: 3,
        entidad: 1,
      })
      .then(
        (response) => {
          result = response?.data;
        },
        (error) => {
          console.error(error);
          console.error(error.response.data);
        },
      );
  } else {
    result = null;
  }
  return result;
};

// Endpoint que se llama despues de un pago satisfactorio de los cargos para registrarlo en la base de datos
const getRecibos = async (importe, cargos, padron_id, tipo_de_padron) => {
  let result;
  const body = {
    metodos_de_pago: [{ metodo: 1, importe }],
    padrones: [{
      cargos,
      padron_id,
      tipo_de_padron,
    }],
    ciudadano: 9,
    entidad_municipal: 1,
    canal_de_pago: 3,
  };
  try {
    const response = await API.post('recaudacion/recibos-externo', body);
    result = response.data;
  } catch (error) {
    console.log(error.response.data);
  }
  console.log('result recibos');
  console.log(result);
  return result;
};

const getRecibo = async (folio) => {
  try {
    const response = await API.get('/recaudacion/recibos-externo/', { params: { folio } });
    return response.data.map((e) => ({
      ...e,
      fecha_de_creacion: toMoment(e.fecha_de_creacion).format(DATE_FORMAT),
      importe_total: toCurrency(e.importe_total),
    }));
  } catch (error) {
    console.log(error, true);
  }
  return [];
};

export const generarReciboPorNetPay = async (values) => {
  try {
    const response = await API.post('/recaudacion/recibo/generar-recibo-por-referencia-de-pago-netpay/', values);
    return {
      base64: `data:application/pdf;base64,${response.data.data}`,
    };
  } catch (error) {
    console.log(JSON.stringify(error.response.data), true);
    return null;
  }
};

export const GET_PADRONES_MAP = Object.freeze({
  1: getCiudadano,
  2: getEmpresa,
  3: getPredio,
  4: getVehiculo,
  6: getHospedaje,
  7: getArrendamiento,
  8: getNomina,
  9: getAlcohol,
  10: getCedular,
  11: getJuegoDeAzar,
  12: getNotario,
  13: getCasaDeEmpenio,
  14: getAgencia,
  15: getContribuyente,
  16: getMotocicleta,
});

export {
  getPadrones,
  getCiudadano,
  getVehiculo,
  getPredio,
  getEmpresa,
  getAdeudoPadron,
  getRecibos,
  getRecibo,
};
