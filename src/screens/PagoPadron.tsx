import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import fonts from '../utils/fonts';

import { tokenizeAmount } from '../services/netpay';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BusquedaAvanzadaCiudadano from '../components/BusquedaAvanzadaComponents/BusquedaAvanzadaCiudadano';
import BusquedaAvanzadaEmpresa from '../components/BusquedaAvanzadaComponents/BusquedaAvanzadaEmpresa';
import BusquedaAvanzadaPredio from '../components/BusquedaAvanzadaComponents/BusquedaAvanzadaPredio';
import BusquedaAvanzadaVehiculo from '../components/BusquedaAvanzadaComponents/BusquedaAvanzadaVehiculo';
import Adeudo from '../components/Adeudo';

import {
  getVehiculo,
  getPredio,
  getEmpresa,
  getCiudadano,
  getAdeudoPadron,
} from '../services/padrones';

import { getReferencia } from '../services/recaudacion';
import { useNotification } from '../components/DropDowAlertProvider';

const PagoPadron = ({ route }) => {
  const [padron, setPadron] = useState();
  const [searchText, setSearchText] = useState('de');
  const [resultCargos, setResultCargos] = useState();
  const [nameSearch, setNameSearch] = useState();
  const [newData, setNewData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0.0);

  const notify = useNotification();

  const navigation = useNavigation();

  useEffect(() => {
    setPadron(route.params.padron);
    notify({
      type: 'warn',
      title: 'LLenar todos los datos requeridos',
      message: 'para realizar el pago ocupo el dato xxxx',
    });
  }, []);

  // Alerta para cuando no se encontro nada acorde a la busqueda
  const showAlert = () => notify({
    type: 'error',
    title: 'Error de busqueda',
    message: 'No se encontró nada que concuerde con la busqueda',
  });

  const handleSearch = async (formData) => {
    setIsLoading(true);
    setNewData(false);
    setTotalAmount(0);
    let response;
    let numeroDePadron;
    if (padron?.descripcion === 'Ciudadano') {
      response = await getCiudadano(searchText, formData);
      numeroDePadron = 1;
      (response !== null) ? setNameSearch(response?.nombre_completo) : null;
    } else if (padron?.descripcion === 'Empresa') {
      response = await getEmpresa(searchText, formData);
      numeroDePadron = 2;
      (response !== null) ? setNameSearch(response?.razon_social) : null;
      // setNameSearch(response.nombre_comercial);
    } else if (padron?.descripcion === 'Predio') {
      response = await getPredio(searchText, formData);
      numeroDePadron = 3;
      (response !== null) ? setNameSearch(response?.cuenta_unica_de_predial) : null;
      // setNameSearch(response?.cuenta_unica_de_predial);
    } else if (padron?.descripcion === 'Vehicular') {
      response = await getVehiculo(searchText, formData);
      numeroDePadron = 4;
      (response !== null) ? setNameSearch(response?.numero_de_placa) : null;
      // setNameSearch(response?.numero_de_placa);
    }
    if (response === null || response === undefined) {
      setIsLoading(false);
      showAlert();
    } else {
      response = await getAdeudoPadron(response, numeroDePadron);
      setResultCargos(response?.cargos);
      setNewData(true);

      setTotalAmount(resultCargos.map((item) => { const cargo = reduceArrCargos(item); return cargo.adeudo_total; }).reduce((prev, curr) => prev + curr, 0));
    }
    setModalKey(modalKey + 1);
    setIsLoading(false);
  };

  const dopayment = async () => {
    if (resultCargos !== undefined) {
      const sumall = resultCargos.map((item) => { const cargo = reduceArrCargos(item); return cargo.adeudo_total; }).reduce((prev, curr) => prev + curr, 0);
    }
    console.log('suma', sumall);

    const responseNetpay = await tokenizeAmount(sumall.toFixed(2));
    // const reponseReferencia = await getReferencia(
    //   sumall.toFixed(2),
    //   resultCargos.map((c) => c.id),
    //   padron.id,
    // );
    if (responseNetpay) {
      navigation.push('netpaypago', { responseNetpay });
    }
  };

  // Calcula los totales y descuentas
  const reduceArrCargos = (cargo) => {
    const {
      descuentos_especiales,
      actualizaciones,
      recargos,
      descuentos_aplicables,
      gastos,
      importe,
    } = cargo;
    let adeudo_total;
    let descuentos_de_actualizacion = 0;
    let descuentos_de_recargos = 0;
    let descuentos_gastos_totales = 0;
    let multa_recargos = 0;
    let multa_gastos = 0;
    let descuentos_de_recargos_str = '';
    let descuentos_de_actualizaciones_str = '';
    let descuentos_de_gastos_str = '';
    const recargo_total = recargos.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    recargos.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      let ttlMultaRec;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_recargos_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      if (item?.es_multa) {
        const filteredRecargos = recargos.filter(
          (recargo) => recargo.es_multa === true,
        );
        ttlMultaRec = filteredRecargos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
      } else {
        ttlMultaRec = 0;
      }
      multa_recargos += ttlMultaRec;
      descuentos_de_recargos += ttlDesc;
    });
    gastos.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      let ttlMultaGto;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_gastos_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      if (item.es_multa) {
        const filteredMultas = gastos.filter((gasto) => gasto.es_multa === true);
        ttlMultaGto = filteredMultas.reduce(
          (accum, curr) => accum + curr.importe,
          0,
        );
      } else {
        ttlMultaGto = 0;
      }
      descuentos_gastos_totales += ttlDesc;
      multa_gastos += ttlMultaGto;
    });

    actualizaciones.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_actualizaciones_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      descuentos_de_actualizacion += ttlDesc;
    });

    const descuentos_especiales_totales = descuentos_especiales.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const descuentos_aplicables_total = descuentos_aplicables.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const actualizaciones_totales = actualizaciones.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const gastos_totales = gastos.reduce(
      (accum, curr) => accum + curr.importe,
      0,
    );

    const descuentos_totales = descuentos_aplicables_total + descuentos_especiales_totales;
    const multas_totales = multa_gastos + multa_recargos;
    adeudo_total = importe
      - descuentos_totales
      + (recargo_total - descuentos_de_recargos)
      + (actualizaciones_totales - descuentos_de_actualizacion)
      + (gastos_totales - descuentos_gastos_totales)
      + multas_totales;
    adeudo_total = adeudo_total;

    return {
      descuentos_de_actualizaciones_str,
      descuentos_de_recargos_str,
      descuentos_de_gastos_str,
      descuentos_gastos_totales,
      descuentos_de_recargos,
      descuentos_de_actualizacion,
      descuentos_aplicables_total,
      descuentos_especiales_totales,
      descuentos_totales,
      multas_totales,
      multa_recargos,
      multa_gastos,
      actualizaciones_totales,
      recargo_total: recargo_total - multa_recargos,
      adeudo_total,
      gastos_totales: gastos_totales - multa_gastos,
    };
  };

  return (
    <View style={styles.container}>
      <Header item="Pagos" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} />
      <Text style={styles.headText}>
        {padron?.descripcion}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30 }}>
        <View style={styles.textInputContainer}>
          <TextInput color="black" placeholderTextColor="#C4C4C4" onChangeText={(text) => setSearchText(text)} style={styles.textInputStyle} placeholder="Buscar..." />
        </View>

        <TouchableWithoutFeedback onPress={() => { handleSearch(); }}>
          <View style={styles.iconContainer}>
            <Icon
              name="search"
              size={30}
              color="white"
            />
          </View>
        </TouchableWithoutFeedback>
        {
          (padron?.descripcion === 'Ciudadano') ? <BusquedaAvanzadaCiudadano onSearch={handleSearch} /> : null
        }
        {
          (padron?.descripcion === 'Empresa') ? <BusquedaAvanzadaEmpresa onSearch={handleSearch} /> : null
        }
        {
          (padron?.descripcion === 'Predio') ? <BusquedaAvanzadaPredio onSearch={handleSearch} /> : null
        }
        {
          (padron?.descripcion === 'Vehicular') ? <BusquedaAvanzadaVehiculo onSearch={handleSearch} /> : null
        }
      </View>
      {console.log('estos son los cargos', resultCargos)}
      {console.log('este es el total', totalAmount)}
      <ScrollView>
        {
          (newData === true && resultCargos?.[0])
            ? resultCargos?.map((cargo, index) => (<Adeudo key={index} nombre={nameSearch || ''} padron={padron?.descripcion} cargo={cargo} />))
            : null
        }

        {newData === true && resultCargos?.[0] === undefined ? (
          <Adeudo
            nombre={
              nameSearch
            }
            padron={padron?.descripcion}
            cargo={null}
          />
        ) : null}

        {
        (isLoading) ? <ActivityIndicator style={styles.loading} size="large" color="#fc9696" /> : null
      }
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total:
          {' $'}
          {totalAmount}
        </Text>
        <View key={modalKey}>
          <TouchableWithoutFeedback onPress={dopayment}>
            <View style={styles.buttonPrint}>
              <Text style={styles.textButton}>Realizar Pago</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
      </View>
    </View>

  );
};

export default PagoPadron;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
    alignItems: 'center',
  },
  headText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontFamily: fonts.black,
  },
  menuContainer: {
    marginVertical: '3%',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  textInputContainer: {
    flex: 1,
    marginVertical: 15,
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#79142A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
    marginBottom: 14,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 7 },
    shadowRadius: 32,
    shadowOpacity: 0.25,
    elevation: 20,
  },
  iconContainer: {
    backgroundColor: 'gray',
    height: 46,
    padding: 5,
    paddingHorizontal: 8,

  },
  iconAvanzadoContainer: {
    backgroundColor: '#79142A',
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    backgroundColor: 'green',
  },
  text: {
    color: 'white',
    padding: 5,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  textButton: {
    color: 'white',
    fontFamily: fonts.bold,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonPrint: {
    backgroundColor: 'green',
    width: Dimensions.get('window').width * 0.85,
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.6,
    marginVertical: 5,
  },
  totalText: {
    color: 'black',
    fontSize: 20,
    padding: 5,
    fontFamily: fonts.bold,
    textAlign: 'left',
  },
  loading: {

  },

});
