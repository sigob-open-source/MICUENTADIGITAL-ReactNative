import React, { Component, useEffect, useState } from 'react';
import {
  PermissionsAndroid, StyleSheet, View, FlatList, Dimensions, TouchableWithoutFeedback,
} from 'react-native';

import { Text } from 'react-native-animatable';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

import getPadrones from '../services/padrones';

const PagoPadron = () => {
  const [padrones, setPadrones] = useState();

  useEffect(() => {
    const response = async () => { await getPadrones(); };
    setPadrones(response);
  }, []);

  return (
    <View style={styles.container}>
      <Header style={styles.header} item="Pagos" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />
      <View style={styles.menuContainer}>
        <Text style={{ color: 'black' }}>
          Hola
        </Text>
      </View>
      <Footer style={styles.footer} />
    </View>
  );
};

export default PagoPadron;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});
