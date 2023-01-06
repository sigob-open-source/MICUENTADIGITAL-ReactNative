import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Alert,
} from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ButtonRequest from '../components/SolicitudComponents/Button';
import ConnectionCheck from '../components/internetChecker';

const SolicitudSelector = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <ConnectionCheck />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Header
          style={styles.header}
          item="Peticiones"
          imgnotif={require('../../assets/imagenes/notificationGet_icon.png')}
          img={require('../../assets/imagenes/header_logo.png')}
        />
        <View style={{ marginTop: '5%' }}>
          <TouchableOpacity onPress={() => Alert.alert('Alerta', 'Opción en mantenimiento.')}>
            <ButtonRequest texto="Ver Solicitudes" iconName="keyboard-arrow-right" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.push('solicitud')}>
            <ButtonRequest texto="Registrar una Solicitud" iconName="keyboard-arrow-right" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.push('tipoDeRegistro')}>
            <ButtonRequest texto="Registrar queja" iconName="keyboard-arrow-right" />
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    width: 336,
    height: 46,
    borderRadius: 5,
    backgroundColor: '#79142A',
    alignSelf: 'center',
    marginBottom: 23,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  textInputContainer: {
    marginTop: 21,
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
    color: 'black',
  },
  textInputStyle: {
    color: 'black',
  },
});

export default SolicitudSelector;
