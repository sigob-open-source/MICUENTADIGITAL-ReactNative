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
  getAdeudoVehiculo,
  getAdeudoPredio,
  getAdeudoEmpresa,
  getAdeudoCiudadano,
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
  const [totalAmount, setTotalAmount] = useState(0);

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

  const showAlert = () => Alert.alert(
    'Problema en la busqueda',
    'No se encontró nada que concuerde con la busqueda.',
    [
      {
        text: 'Entendido',
        style: 'cancel',
      },
    ],
  );

  const handleSearch = async (formData) => {
    setIsLoading(true);
    setNewData(false);
    let response;
    if (padron.descripcion === 'Ciudadano') {
      response = await getAdeudoCiudadano(searchText, formData);
      (response !== null) ? setNameSearch(response.first_name) : null;
    } else if (padron.descripcion === 'Empresa') {
      response = await getAdeudoEmpresa(searchText, formData);
      (response !== null) ? setNameSearch(response.nombre_comercial) : null;
      // setNameSearch(response.nombre_comercial);
    } else if (padron.descripcion === 'Predio') {
      response = await getAdeudoPredio(searchText, formData);
      (response !== null) ? setNameSearch(response.cuenta_unica_de_predial) : null;
      // setNameSearch(response?.cuenta_unica_de_predial);
    } else if (padron.descripcion === 'Vehicular') {
      response = await getAdeudoVehiculo(searchText, formData);
      (response !== null) ? setNameSearch(response.numero_de_placa) : null;
      // setNameSearch(response?.numero_de_placa);
    }
    if (response === null || response === undefined) {
      setIsLoading(false);
      showAlert();
    } else {
      console.log('datainfo', response);

      setResultCargos(response?.cargos);
      setNewData(true);
    }
    setModalKey(modalKey + 1);
    setIsLoading(false);
  };

  const dopayment = async () => {
    const sumall = resultCargos.map((item) => item.importe).reduce((prev, curr) => prev + curr, 0);
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
          (newData === true && resultCargos?.[0] !== null)
            ? resultCargos?.map((cargo, index) => (<Adeudo key={index} nombre={nameSearch || ''} padron={padron?.descripcion} cargo={cargo} />))
            : null
        }

        {newData === true && resultCargos[0] === undefined ? (
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

      <View key={modalKey}>
        <TouchableWithoutFeedback onPress={dopayment}>
          <View style={styles.buttonPrint}>
            <Text style={styles.text}>Realizar Pago</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>

      <Footer style={styles.footer} />
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
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  buttonPrint: {
    backgroundColor: 'green',
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.6,
    marginVertical: 5,
  },
  loading: {

  },

});
