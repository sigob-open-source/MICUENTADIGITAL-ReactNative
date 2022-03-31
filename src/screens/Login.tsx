import React from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, Dimensions, TouchableOpacity,
} from 'react-native';
import fonts from '../utils/fonts';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Login = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.topView}>
      <ImageBackground source={require('../../assets/imagenes/image-bg.png')} style={styles.background}>

        <Image source={require('../../assets/imagenes/Escudo_Nay1.png')} style={styles.logo_img} />
        <Text style={styles.headerText}>App</Text>
        <Text style={styles.headerText}>Ciudadana</Text>
        <Text style={styles.subheaderText}>
          Ingresa con tus credenciales para administrar tu cuenta online
        </Text>
      </ImageBackground>
    </View>

    <View style={styles.bottomV}>
      <Text style={styles.textBlack}>Iniciar Sesión con</Text>

      <TouchableOpacity style={styles.micuentaButton} title="Ingresar con mi cuenta">
        <Image source={require('../../assets/imagenes/micuenta.png')} resizeMode="contain" style={{ flex: 1 }} />
      </TouchableOpacity>

      <Text style={styles.textBlack}>Tambien puedes</Text>

      <TouchableOpacity style={styles.sincuentaButton} title="Ingresar sin Cuenta">
        <Text style={styles.sincuentaText}>INGRESAR SIN CUENTA</Text>
      </TouchableOpacity>

      <Text style={{
        color: 'black', textAlign: 'center', paddingTop: 20, fontSize: 15,
      }}
      >
        ¿Aun no tienes una cuenta?
      </Text>
      <Text style={styles.hipervinculo}>Registrate aqui</Text>

    </View>

  </SafeAreaView>
);

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79142A',
    justifyContent: 'flex-end',
  },
  background: {
    height: screenHeight / 2,
    width: screenWidth,
    alignItems: 'center',
    paddingTop: 50,
  },
  logo_img: {
    height: screenHeight / 8,
    resizeMode: 'contain',
  },
  topView: {

  },
  bottomV: {
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
  },
  subheaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    margin: 30,
  },
  textBlack: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: 'black',
    fontSize: 15,
    paddingVertical: 20,
  },
  micuentaButton: {
    backgroundColor: 'white',
    borderColor: '#79142A',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
  },
  sincuentaButton: {
    backgroundColor: '#79142A',
    borderRadius: 10,
  },
  sincuentaText: {
    fontFamily: fonts.bold,
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    padding: 10,
  },
  hipervinculo: {
    fontFamily: fonts.regular,
    color: 'blue',
    textAlign: 'center',
  },
});
