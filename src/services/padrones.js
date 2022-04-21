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

const getAdeudoCiudadano = async (search, advanceSearch) => {
  let urlEndpoint = 'cuentaunicasir/ciudadano-caja-atencion-ciudadana/';
  urlEndpoint = `${urlEndpoint}`
  + `?q=${search || ''}`
  + `&clave_ciudadana=${advanceSearch?.clave_ciudadana || ''}`
  + `&first_name=${advanceSearch?.first_name || ''}`
  + `&last_name=${advanceSearch?.last_name || ''}`
  + `&second_last_name=${advanceSearch?.second_last_name || ''}`
  + `&email=${advanceSearch?.email || ''}`
  + `&numero_de_celular=${advanceSearch?.numero_de_celular || ''}`
  + `&CURP=${advanceSearch?.CURP || ''}`
  + `&RFC=${advanceSearch?.RFC || ''}`;
  let result;
  await http.get(urlEndpoint).then(
    (response) => {
      result = response.data[0];
      console.log('la primera respuesta');
      console.log(response);
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
  let urlEndpoint = 'recaudacion/vehiculos-caja/';
  urlEndpoint = `${urlEndpoint}`
  + `?q=${search || ''}`
  + `&numero_de_placa=${advanceSearch?.numero_de_placa || ''}`
  + `&tipo_de_vehiculo=${advanceSearch?.tipo_de_vehiculo || ''}`
  + `&linea=${advanceSearch?.linea || ''}`
  + `&clase_del_vehiculo=${advanceSearch?.clase_del_vehiculo || ''}`
  + `&servicio=${advanceSearch?.servicio || ''}`
  + `&estatus_del_vehiculo=${advanceSearch?.estatus_del_vehiculo || ''}`;
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

const getAdeudoPredio = async (search, advanceSearch) => {
  let urlEndpoint = `catastro/predio-caja/`;
  urlEndpoint = `${urlEndpoint}`
  + `?q=${search}`
  + `&razon_social=${advanceSearch?.razon_social || ''}`
  + `&nombre_comercial=${advanceSearch?.nombre_comercial || ''}`
  + `&pagina_web=${advanceSearch?.pagina_web || ''}`
  + `&RFC=${advanceSearch?.RFC || ''}`
  + `&tipo_de_establecimiento=${advanceSearch?.tipo_de_establecimiento || ''}`
  + `&domicilio_fiscal__codigo_postal=${advanceSearch?.codigo_postal || ''}`
  + `&domicilio_fiscal__calle_principal=${advanceSearch?.calle_principal || ''}`
  + `&domicilio_fiscal__numero_exterior=${advanceSearch?.numero_exterior || ''}`;
  + `&cuenta_unica_de_predial=${advanceSearch?.cuenta_unica_de_predial || ''}`
  + `&CURT=${advanceSearch?.CURT || ''}`
  + `&clave_catastral_estandar=${advanceSearch?.clave_catastral_estandar || ''}`
  + `&clave_catastral_municipal=${advanceSearch?.clave_catastral_municipal || ''}`
  + `&direccion__codigo_postal=${advanceSearch?.direccion_codigo_postal || ''}`
  + `&direccion__calle_principal=${advanceSearch?.direccion_calle_principal || ''}`
  + `&direccion_numero_exterior=${advanceSearch?.direccion_numero_exterior || ''}`;
  let result;
  await http.get(urlEndpoint).then(
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

const getAdeudoEmpresa = async (search, advanceSearch) => {
  let urlEndpoint = 'cuentaunicasir/empresas-caja-atencion-ciudadana/';
  urlEndpoint = `${urlEndpoint}`
  + `&razon_social=${advanceSearch?.razon_social || ''}`
  + `&nombre_comercial=${advanceSearch?.nombre_comercial || ''}`
  + `&pagina_web=${advanceSearch?.pagina_web || ''}`
  + `&RFC=${advanceSearch?.RFC || ''}`
  + `&tipo_de_establecimiento=${advanceSearch?.tipo_de_establecimiento || ''}`
  + `&domicilio_fiscal__codigo_postal=${advanceSearch?.codigo_postal || ''}`
  + `&domicilio_fiscal__calle_principal=${advanceSearch?.calle_principal || ''}`
  + `&domicilio_fiscal__numero_exterior=${advanceSearch?.numero_exterior || ''}`;
  let result;
  await http.get(urlEndpoint).then(
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
