import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Image, Modal, Pressable,
} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ComentarioInfo from '../components/ComentarioInfo';
import fonts from '../utils/fonts';

MapboxGL.requestAndroidLocationPermissions();
MapboxGL.setAccessToken('sk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNnM2azV4NGI2ODNjcGtkMnlhbHhkNSJ9.OFrtu6biPoxkVm_RU8zz7w');
MapboxGL.geoUtils;

const VerSolicitud = ({ route }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [estadoSolicitud, setEstadoSolicitud] = useState('En Revisión');
  const [solicitud, setSolicitud] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    setSolicitud(route.params.solicitud);
    coordsHandler();
  }, []);

  const coordsHandler = async () => {
    try {
      const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${route.params.solicitud.longitud},${route.params.solicitud?.latitud}.json?language=es&types=address&postcode&access_token=sk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNnM2azV4NGI2ODNjcGtkMnlhbHhkNSJ9.OFrtu6biPoxkVm_RU8zz7w`);
      setAddress(res.data.features[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const onPressHandler = () => {
    setModalVisibility(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Header style={styles.header} item="Solicitud" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />
        <View style={styles.container}>
          <Pressable style={styles.estadoSolicitud} onPress={onPressHandler} android_ripple={{ color: '#d3c7c7' }}>
            <Text style={styles.text}>{estadoSolicitud}</Text>
            <MaterialIcons style={{ textAlign: 'center' }} size={30} color="black" name="navigate-next" />
          </Pressable>
          <View style={styles.rectangle}>
            <Image
              style={styles.image}
            />
          </View>
          <ComentarioInfo headText="Comentario de Usuario" subText={solicitud?.comentario || 'prueba'} iconName="person" />
          <ComentarioInfo headText={`${address?.place_name}` || 'Av. Ferrocaril y Salvador Cabrales.'} subText="Ver locación en el mapa" hipervinculo iconName="gps-fixed" />
        </View>
        <Footer style={styles.footer} />
      </View>
      <Modal
        visible={modalVisibility}
        transparent
        onRequestClose={() => {
          setModalVisibility(false);
        }}
      >
        <View style={styles.centeredModal}>
          <View style={styles.modalContent}>
            <Pressable
              onPress={() => { setEstadoSolicitud('En Revisión'); setModalVisibility(false); }}
              android_ripple={{ color: 'green' }}
            >
              <Text style={styles.modalText}>En Revisión</Text>
            </Pressable>
            <Pressable onPress={() => { setEstadoSolicitud('En Elaboración'); setModalVisibility(false); }}>
              <Text style={styles.modalText}>En Elaboración</Text>
            </Pressable>
            <Pressable onPress={() => { setEstadoSolicitud('En Proceso'); setModalVisibility(false); }}>
              <Text style={styles.modalText}>En Proceso</Text>
            </Pressable>
            <Pressable onPress={() => { setEstadoSolicitud('Terminado'); setModalVisibility(false); }}>
              <Text style={styles.modalText}>Terminado</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
  estadoSolicitud: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 12,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 17,
    marginHorizontal: 15,
    marginVertical: 16,
  },
  rectangle: {
    backgroundColor: 'gray',
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  image: {
    resizeMode: 'cover',
    height: 334,
    width: undefined,
    borderRadius: 5,
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
  centeredModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  modalContent: {
    backgroundColor: 'white',
    borderColor: '#000',
    borderRadius: 5,
  },
  modalText: {
    color: 'black',
    fontFamily: fonts.semiBold,
    fontSize: 20,
    marginHorizontal: 30,
    marginVertical: 16,
  },
});

export default VerSolicitud;
