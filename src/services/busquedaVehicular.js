import http from './http';


const getLineasVehiculares = async () => {
  let data = [];
  await http.get('recaudacion/lineas-vehiculares/').then(
    (response) => {
      const result = response.data;
      result.map((element) => {
        data = [...data, {label: element.nombre, value: element.id}]
      })
      return data;
    },
    (error) => {
      console.log(error);
    },
  );
  return data;
};

const getMarcasVehiculos = async () => {
  let data = [];
  await http.get('recaudacion/marcas-de-vehiculos/').then(
    (response) => {
      const result = response?.data?.results;
      result.map((element) => {
        data = [...data, {label: element.nombre, value: element.id}]
      });
      return data;
    },
    (error) => {
      console.log(error);
    },
  );
  return data;
};

const getServiciosVehiculo = async () => {
  let data = [];
  await http.get('recaudacion/servicios-del-vehiculo/').then(
    (response) => {
      const result = response?.data;
      result.map((element) => {
        data = [...data, {label: element.nombre, value: element.id}]
      });
      return data;
    },
    (error) => {
      console.log(error);
    },
  );
  return data;
};

const getEstadosVehiculo = async () => {
  let data = [];
  await http.get('recaudacion/estados-del-vehiculo/').then(
    (response) => {
      const result = response?.data;
      result.map((element) => {
        data = [...data, {label: element.nombre, value: element.id}]
      });
      return data;
    },
    (error) => {
      console.log(error);
    },
  );
  return data;
};

const getTiposVehiculo = async () => {
  let data = [];
  await http.get('recaudacion/tipos-de-vehiculos/').then(
    (response) => {
      const result = response?.data;
      result.map((element) => {
        data = [...data, {label: element.nombre, value: element.id}]
      });
      return data;
    },
    (error) => {
      console.log(error);
    },
  );
  return data;
};

const getClasesVehiculos = async () => {
  let data = [];
  await http.get('recaudacion/clases-de-vehiculos/').then(
    (response) => {
      const result = response?.data;
      result.map((element) => {
        data = [...data, {label: element.nombre, value: element.id}]
      });
      return data;
    },
    (error) => {
      console.log(error);
    },
  );
  return data;
};


export { getLineasVehiculares, getMarcasVehiculos, getServiciosVehiculo, getEstadosVehiculo, getTiposVehiculo, getClasesVehiculos };