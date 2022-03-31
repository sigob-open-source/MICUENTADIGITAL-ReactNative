import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentSolicitud from '../components/ContentSolicitud';

const VerSolicitudes = () => (
  <View style={styles.container}>
    <Header style={styles.header} item="Solicitudes" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />
    <View style={styles.container}>
      <ContentSolicitud fecha="24/3/2042" />
      <ContentSolicitud fecha="24/3/2022" />
      <ContentSolicitud fecha="24/3/2022" />
    </View>
    <Footer style={styles.footer} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
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

export default VerSolicitudes;
