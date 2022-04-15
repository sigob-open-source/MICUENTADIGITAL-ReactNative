import http from './http';

const getPadrones = async () => {
  await http.get('catalogos/padrones/').then(
    (response) => {
      const result = response.data;
      console.log(result);
      return result;
    },
    (error) => {
      console.log(error);
    },
  );
};

const getAdeudoCiudadano = async (search) => {
  let result;
  await http.get(`cuentaunicasir/ciudadano-caja-atencion-ciudadana/?q=${search}`).then(
    (response) => {
      console.log(response);
      result = response.data[0];
    },
  ).then(async () => {
    await http.post('cuentaunicasir/consulta-caja-atencion-ciudadana/', {
      ciudadano: result.id,
      canal_de_pago: 4,
      entidad_municipal: 1,
    }).then((response) => {
      console.log('data de ciudadano');
      console.log(response.data);
      result = response.data[0];
    }).catch((error) => {
      console.error(error);
    });
  });
  return result;
};

const getAdeudoVehiculo = async (search) => {
  let result;
  await http.get(`recaudacion/vehiculos-caja/?q=${search}`).then(
    (response) => {
      console.log(response);
      result = response.data[0];
    },
  ).then(async () => {
    await http.post('recaudacion/consulta-caja/padron/', {
      padron: 4,
      padron_id: result.id || 0,
    }).then((response) => {
      console.log('data de vehiculos');
      result = response.data;
    }).catch((error) => {
      console.error(error);
    });
  });
  return result;
};

const getAdeudoPredio = async (search) => {
  let result;
  await http.get(`catastro/predio-caja/?q=${search}`).then(
    (response) => {
      result = response.data[0];
    },
  ).then(async () => {
    await http.post('recaudacion/consulta-caja/padron/', {
      padron: 3,
      padron_id: result.id || 0,
    }).then((response) => {
      console.log('data de predios');
      result = response.data;
    }).catch((error) => {
      console.error(error);
    });
  });
  return result;
};

const getAdeudoEmpresa = async (search) => {
  let result;
  await http.get(`cuentaunicasir/empresas-caja-atencion-ciudadana/?q=${search}`).then(
    (response) => {
      result = response.data[0];
      console.log('infoem');
      console.log(response.data);
    },
  ).then(async () => {
    await http.post('recaudacion/consulta-caja/padron/', {
      padron: 2,
      padron_id: result.id,
    }).then((response) => {
      console.log('data de empresa');
      console.log(response.data);
      result = response.data;
    }).catch((error) => {
      console.error(error);
    });
  });
  return result;
};

export {
  getPadrones, getAdeudoCiudadano, getAdeudoVehiculo, getAdeudoPredio, getAdeudoEmpresa,
};
