import {
  PermissionsAndroid,
  Modal,
  StyleSheet,
  View,
  Text,
  Alert,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import MapBoxGL from '@react-native-mapbox-gl/maps';
import axios from 'axios';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';

import MapboxGL from '@react-native-mapbox-gl/maps';
import Header from '../Header';

import Footer from '../Footer';

MapBoxGL.requestAndroidLocationPermissions();
MapBoxGL.setAccessToken('pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ');
MapBoxGL.geo;

const MapaModal = (props) => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [coords, setCoords] = useState([0, 0]);
  const [street, setStreet] = useState(null);
  const [canChangeCoords, setCanChangeCoords] = useState(false);

  const changeCoordinates = async (feature) => {
    setCoords(feature.geometry.coordinates);
  };

  const apihandler = () => {
    try {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?language=es&type=address&access_token=pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ`)
        .then((response) => {
          const posts = response.data.features[0].place_name;
          setStreet(posts);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (!props.otherOpen) {
      apihandler();
    }
    return () => {
      abortController.abort();
    };
  }, [coords]);

  useEffect(() => {
    const abortController = new AbortController();
    if (!props.otherOpen) {
      apihandler();
      setCanChangeCoords(true);
    }
    return () => {
      abortController.abort();
    };
  }, [props.otherOpen]);

  useEffect(() => {
    const abortController = new AbortController();
    GetLocation();
    return () => {
      abortController.abort();
    };
  }, []);

  const GetLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords([position.coords.longitude, position.coords.latitude]);
        setLong([position.coords.longitude]);
        setLat([position.coords.latitude]);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  const close = () => {
    props.close;
  };

  const show = async () => {
    const resultLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (resultLocation) {
      if (lat == 0 && long == 0) {
        GetLocation();
      }
    } else {
      Alert.alert(
        'Alerta',
        'Debe de proporcionar los permisos necesarios para poder seleccionar su ubicación',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ir a configuración de la app', onPress: () => Linking.openSettings() },
        ],
        { cancelable: false },
      );
    }
  };

  const _handleSendLocation = () => {
    if (street != null) {
      props.mapToParent(street, lat, long);
    }
  };

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;

    return (

      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>

    );
  };

  const renderTitle = () => (
    <View>
      <Text style={{
        color: '#8F8F8F',
        fontSize: 16,
        margin: 15,
      }}
      >
        {props.title}
      </Text>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.open}
      onRequestClose={close}
    >

      <View style={{ flex: 1 }}>
        <Header
          style={styles.header}
          item="Trámites"
          imgnotif={require('../../../assets/imagenes/notificationGet_icon.png')}
          img={require('../../../assets/imagenes/header_logo.png')}
        />

        <TouchableWithoutFeedback>
          <View style={styles.streetName}>
            {
            street != undefined ? (
              <Text style={{ color: 'black' }}>{street}</Text>
            ) : null
          }

          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPressIn={() => _handleSendLocation()}
          onPress={props.close}

        >
          <View style={styles.sendRequestGeneralContainer}>
            <View style={styles.sendRequestStyle}>
              <View style={styles.sendRequestContainer}>
                <Text style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '500',
                }}
                >
                  Seleccionar Locación
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{
          flex: 1,
          height: '100%',
          width: '100%',
          borderRadius: 90,
        }}
        >
          {
          canChangeCoords ? (
            <MapboxGL.MapView
              logoEnabled={false}
              localizeLabels
              onPress={(feature) => changeCoordinates(feature)}
              styleURL={MapBoxGL.StyleURL.Street}
              zoomLevel={17}
              style={{ flex: 1 }}
            >

              <MapBoxGL.Camera
                centerCoordinate={coords}
                zoomLevel={17}
                animationMode="flyTo"
                animationDuration={0}
              />

              <MapBoxGL.MarkerView
                anchor={{ x: 0.5, y: 0.9 }}
                coordinate={coords}
              >
                <Fontisto style={{ alignSelf: 'flex-end' }} size={50} name="map-marker-alt" color="#79142A" />
              </MapBoxGL.MarkerView>

            </MapboxGL.MapView>
          ) : null
        }

        </View>

      </View>

      <Footer
        back={props.close}
        showBack
        style={styles.footer}
      />

    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 10,
    position: 'absolute',
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#79142A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
  },
  streetName: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: '25%',
    zIndex: 10,
    position: 'absolute',
    width: 336,
    height: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  optionCard: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    backgroundColor: '#e6e6e6',
  },
  collapsibleContent: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapsibleText: {
    fontWeight: '500',
    marginLeft: '10%',
    fontSize: 20,
    color: 'black',
  },
  sendRequestContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRequestGeneralContainer: {
    marginTop: '155%',
    zIndex: 10,
    position: 'absolute',
    backgroundColor: 'transparent',
    flex: 0.2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  sendRequestStyle: {
    width: 333,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#4EDE7F',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
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

export default MapaModal;
