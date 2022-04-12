import React, { Component, useEffect, useState } from 'react';
import {
  PermissionsAndroid, StyleSheet, View, FlatList, Dimensions, TouchableWithoutFeedback, TextInput, Touchable,
} from 'react-native';

import { Text } from 'react-native-animatable';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';

import getPadrones from '../services/padrones';
import fonts from '../utils/fonts';
import http from '../services/http';
import Adeudo from '../components/Adeudo';

const PagoPadron = ({ route }) => {
  const [padron, setPadron] = useState();
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    setPadron(route.params.padron);
  }, []);

  const handleSearch = async () => {
    console.log(searchText);
    let url;
    if (padron === 'Ciudadano') url = 'cuentaunicasir/ciudadano-caja/';
    else if (padron === 'Empresa') url = 'empresas/empresa-caja/';
    else if (padron === 'Predio') url = 'catastro/predio-caja/';
    else if (padron === 'Vehicular') url = 'recaudacion/vehiculos-caja/';

    await http.get(url).then(
      (response) => {
        const result = response.data;
        console.log(result);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const getSearch = async (url) => {
    await http.get(url).then(
      (response) => {
        const result = response.data;
        console.log(result);
      },
      (error) => {
        console.log(error);
      },
    );
  };

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
        <Adeudo padron={padron} nombre="Carlos" cantidad="100" />
        <Adeudo padron={padron} nombre="Carlos" cantidad="100" />
      </View>
      <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 40 }}>
        <TouchableWithoutFeedback>
          <View style={styles.button}>
            <Text>
              HOla
            </Text>
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    backgroundColor: 'green',
  },

});
