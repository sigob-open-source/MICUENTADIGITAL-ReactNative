import { HTTP } from './http';

const getReferencia = async (importe, cargos, padronId, tipoDePadronId) => {
  try {
    const response = await HTTP.post('/recaudacion/generar-referencia-pago-netpay/', {
      importe,
      cargos,
      padron_id: padronId,
      tipo_de_padron_id: tipoDePadronId,
      entidad_municipal_id: 1,
    });

    if (response?.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data);
  }
};

export {
  getReferencia,
};
