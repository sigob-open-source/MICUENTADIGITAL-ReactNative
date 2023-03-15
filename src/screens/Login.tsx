import {
  StyleSheet, Text, View, Image, TouchableOpacity,
} from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import IMAGEN from '../../assets/imagenes/jrzfondo.png';
import IconLogo from '../../assets/imagenes/logo.png';

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imgcontainer}>
        <Image style={styles.Image} source={IMAGEN} />

        <View style={styles.iconLogoContiner}>
          <Image style={styles.iconLogo} source={IconLogo} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('registroCiudadano')}>
          <View style={styles.buttonCredenciales}>
            <Text style={styles.textButtonSin}>Iniciar Sesion con Cuenta Unica</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('menuInicio')}>
          <View style={styles.buttonSinCredenciales}>
            <Text style={styles.textButtonSin}>Entrar sin Usuario</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  imgcontainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  iconLogoContiner: {
    backgroundColor: 'white',
    height: 100,
    width: 120,
    borderRadius: 10,
    padding: 5,
  },
  iconLogo: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    height: '28%',
    width: '100%',
    padding: 30,
  },
  buttonSinCredenciales: {
    backgroundColor: '#582E44',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonCredenciales: {
    backgroundColor: '#582E44',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  textButtonSin: {
    color: 'white',
    fontSize: 12,
  },
});
