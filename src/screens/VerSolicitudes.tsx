import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Image, TouchableWithoutFeedback, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getSolicitudes } from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentSolicitud from '../components/ContentSolicitud';
import fonts from '../utils/fonts';

const VerSolicitudes = props => {
  const [solicitudes, setSolicitudes] = useState([]);

  const getData = async () => {
    const res = await getSolicitudes();
    setSolicitudes(res);
  };
  
  const goBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item }) => (
    <ContentSolicitud fecha={item.fecha_de_la_solicitud} solicitud={item} />
  );

  return (
    <View style={styles.container}>
      <Header style={styles.header} item="Solicitudes" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />
      <View style={styles.container}>
        {(solicitudes.length === 0) ? <Text style={styles.noSolicitud}>No hay solicitudes por mostrar</Text> : null}
        <FlatList
          data={solicitudes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Footer 
        back={goBack}
        showBack={true} 
        style={styles.footer} />
    </View>
  );
};

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
  noSolicitud: {
    color: 'gray',
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
});

export default VerSolicitudes;
