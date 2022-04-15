import React, { Component, useEffect, useState } from 'react';
import {
  PermissionsAndroid, StyleSheet, View, FlatList, Dimensions, TouchableWithoutFeedback, TextInput,
} from 'react-native';

import { Text } from 'react-native-animatable';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  getAdeudoVehiculo, getAdeudoPredio, getAdeudoEmpresa, getAdeudoCiudadano,
} from '../services/padrones';
import fonts from '../utils/fonts';
import http from '../services/http';
import Adeudo from '../components/Adeudo';
import ModalPago from '../components/ModalPago';

const PagoPadron = ({ route }) => {
  const [padron, setPadron] = useState();
  const [searchText, setSearchText] = useState();
  const [resultCargos, setResultCargos] = useState();
  const [nameSearch, setNameSearch] = useState();
  const [newData, setNewData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState(100);

  useEffect(() => {
    setPadron(route.params.padron);
  }, []);

  const handleSearch = async () => {
    setNewData(false);
    console.log(searchText);
    let url;
    let response;
    if (padron === 'Ciudadano') {
      response = await getAdeudoCiudadano(searchText);
      console.log(response);
      setNameSearch(response.first_name);
    } else if (padron === 'Empresa') {
      // response = await getAdeudoEmpresa(searchText);
      // setNameSearch(response.nombre_comercial);
    } else if (padron === 'Predio') {
      // response = await getAdeudoPredio(searchText);
      // setNameSearch(response?.cuenta_unica_de_predial);
    } else if (padron === 'Vehicular') {
      // response = await getAdeudoVehiculo(searchText);
      // setNameSearch(response?.numero_de_placa);
    }
    setResultCargos(response.cargos);
    setModalKey(modalKey + 1);
    setNewData(true);
  };

  // const handleAdeudo = () => {
  //   console.log('poads');
  //   return (
  //     resultCargos.cargos.map((cargo) => {
  //       <Adeudo nombre={nameSearch} padron={padron} cantidad={cargo.importe} />;
  //     })

  //   );
  // };

  return (
    <View style={styles.container}>
      <Header style={styles.header} item="Pagos" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />
      <Text style={styles.headText}>
        {route.params.padron}
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

      </View>
      <View>
        {
          (newData === true)
            ? resultCargos.map((cargo, index) => (<Adeudo key={index} nombre={nameSearch} padron={padron} cargo={cargo} />))
            : null
        }
      </View>

      <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 40 }} />
      <View key={modalKey}>
        <ModalPago cargos={resultCargos || undefined} />
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    backgroundColor: 'green',
  },

});
