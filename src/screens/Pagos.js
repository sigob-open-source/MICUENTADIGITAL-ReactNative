import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet, View, TextInput, FlatList, TouchableWithoutFeedback, Text, ScrollView, Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Square from '../components/CardPagos';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConnectionCheck from '../components/internetChecker';

import http from '../services/http';
import getPadrones from '../services/padrones';

const numColumns = 3;

const Pagos = (props) => {
  const [padrones, setPadrones] = useState();
  const [listPadrones, setListPadrones] = ([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    getPadronesList();
  }, []);

  const getPadronesList = async () => {
    let data = [];
    await http.get('catalogos/padrones/').then(
      (response) => {
        const result = response.data;
        result.map((padron, index) => {
          if (typeof (padron) === 'object') {
            (padron?.descripcion !== 'Todo') ? data = [...data, padron] : null;
          }
        });
        setPadrones(data);
        console.log(padrones);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const checkIcon = (elementName) => {
    if (elementName === 'Ciudadano') return 'user';
    if (elementName === 'Empresa') return 'briefcase';
    if (elementName === 'Predio') return 'building';
    if (elementName === 'Vehicular') return 'car-alt';
    if (elementName === 'Todo') return 'align-justify';
    if (elementName === 'Hospedaje') return 'bed';
    if (elementName === 'Arrendamiento') return 'wpforms';
    if (elementName === 'Nomina') return 'cc-visa';
    if (elementName === 'Alcohol') return 'cube';
    if (elementName === 'Cedular') return 'id-card';
    if (elementName === 'JuegoDeAzar') return 'delicious';
    if (elementName === 'Notario') return 'gavel';
    if (elementName === 'CasaDeEmpenio') return 'university';
    if (elementName === 'Agencia') return 'lock';
    return 'van';
  };

  const formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - (totalRows * numColumns);

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({
        name: 'nada', iconname: 'question', enableEntypo: false, isBlank: true,
      });
      totalLastRow++;
    }
    return dataList;
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const _renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => props.navigation.push(item.navegacion)}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Square
          col={item.color}
          isBlank={item.isBlank}
          style={styles.menuContainer}
          enableEntypo={item.enableEntypo}
          nombreItem={item.name}
          iconName={item.iconname}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{flex:1}}>

      <ConnectionCheck/>
 
    <View style={styles.container}>
      
      <Header style={styles.header} item="Pagos" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />
      <View style={{marginTop:'22%'}}>
      <View style={styles.textInputContainer}>
        <TextInput color="black" placeholderTextColor="#C4C4C4" style={styles.textInputStyle} placeholder="Buscar..." />
      </View>

      <View style={{
        flex: 1, justifyContent: 'center',
      }}
      >
        {
        (padrones)
          ? (
            <FlatList
              data={padrones}
              renderItem={({ padron, index }) => (
                <Pressable onPress={() => props.navigation.push('pagoPadron', { padron: padrones[index] })}>
                  <Square
                    col="#404040"
                    isBlank={false}
                    style={styles.menuContainer}
                    enableEntypo
                    nombreItem={padrones[index]?.descripcion || 'default'}
                    iconName={checkIcon(padrones[index].descripcion)}
                  />
                </Pressable>

              )}
              key={(index) => index}
              numColumns={3}
            />
          )
          : null
      }
        </View>
      </View>

      <Footer
        back={goBack}
        showBack
        style={styles.footer}
      />

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
    alignItems: 'center',
  },

  menuContainer: {
    marginHorizontal: 6,
    marginVertical: '6%',
  },
  textInputContainer: {
    marginVertical: 15,
    width: 336,
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  textInputStyle: {
    height: '100%',
    marginLeft: 14,
    fontSize: 13,
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
});

export default Pagos;
