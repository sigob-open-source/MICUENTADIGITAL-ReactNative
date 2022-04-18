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
      result = response.data[0];
    },
    (error) => { console.error(error); },
  ).then(async () => {
    if (result !== undefined && result !== null) {
      await http.post('cuentaunicasir/consulta-caja-atencion-ciudadana/', {
        ciudadano: result.id,
        canal_de_pago: 3,
        entidad_municipal: 1,
      }).then((response) => {
        result = response.data[0];
      }, (error) => { console.error(error); });
    } else {
      result = null;
    }
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
    (error) => { console.error(error); },
  ).then(async () => {
    if (result !== undefined && result !== null) {
      await http.post('cuentaunicasir/consulta-caja-atencion-ciudadana/padron/', {
        padron_id: result.id,
        padron: 4,
        canal_de_pago: 3,
        entidad_municipal: 1,
      }).then((response) => {
        result = response.data[0];
      }, (error) => { console.error(error); });
    } else {
      result = null;
    }
  });
  return result;
};

const getAdeudoPredio = async (search) => {
  let result;
  await http.get(`catastro/predio-caja/?q=${search}`).then(
    (response) => {
      result = response.data[0];
    },
    (error) => { console.error(error); },
  ).then(async () => {
    if (result !== undefined && result !== null) {
      await http.post('cuentaunicasir/consulta-caja-atencion-ciudadana/padron/', {
        padron_id: result.id,
        padron: 3,
        canal_de_pago: 3,
        entidad_municipal: 1,
      }).then((response) => {
        result = response.data[0];
      }, (error) => { console.error(error); });
    } else {
      result = null;
    }
  });
  return result;
};

const getAdeudoEmpresa = async (search) => {
  let result;
  await http.get(`cuentaunicasir/empresas-caja-atencion-ciudadana/?q=${search}`).then(
    (response) => {
      result = response.data[0];
    },
    (error) => { console.error(error); },
  ).then(async () => {
    if (result !== undefined && result !== null) {
      await http.post('cuentaunicasir/consulta-caja-atencion-ciudadana/padron/', {
        padron_id: result.id,
        padron: 2,
        canal_de_pago: 3,
        entidad_municipal: 1,
      }).then((response) => {
        result = response.data;
      }, (error) => { console.error(error); });
    } else {
      result = null;
    }
  });
  console.log(result);
  return result;
};

export {
  getPadrones, getAdeudoCiudadano, getAdeudoVehiculo, getAdeudoPredio, getAdeudoEmpresa,
};
