import React from 'react';
import { StyleSheet, View } from 'react-native';

import ButtonRequest from '../components/SolicitudComponents/Button';
import Header from '../components/Header';
import ConnectionCheck from '../components/internetChecker';
import Footer from '../components/Footer';

const Peticiones = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <ConnectionCheck/>
      <View style={{ flex: 1 }}>

        <Header
          style={styles.header}

          item="Peticiones"
          imgnotif={require('../../assets/imagenes/notificationGet_icon.png')}
          img={require('../../assets/imagenes/header_logo.png')}
        />
        <View style={{marginTop:'24%'}}>
          <ButtonRequest texto="Pagos" showArrow iconName="keyboard-arrow-right" />
          <ButtonRequest texto="Directorio de Funcionarios" showArrow iconName="keyboard-arrow-right" />
          <ButtonRequest texto="Oficinas de Atención" showArrow iconName="keyboard-arrow-right" />
        </View>
      </View>

      <Footer
        back={goBack}
        showBack
        style={styles.footer}
      />

    </View>
  );
};

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
});

export default Peticiones;
