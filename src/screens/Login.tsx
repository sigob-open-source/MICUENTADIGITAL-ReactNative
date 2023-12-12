import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import IMAGEN from '../../assets/imagenes/jrzfondo.png';
import IconLogo from '../../assets/imagenes/logo.png';
import { useAppSelector } from '../store-v2/hooks';
import { RootStackParamList } from '../types/navigation';

type LoginScreenProps = NativeStackScreenProps<
RootStackParamList,
'loginScreen'
>;

const Login = ({ navigation }: LoginScreenProps) => {
  const isLoggedIn = useAppSelector((state) => Boolean(state.auth.ciudadano));

  const next = () => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [
          { name: 'menuInicio' },
        ],
      });

      return;
    }

    navigation.reset({
      index: 1,
      routes: [
        { name: 'loginScreen' },
        { name: 'menuInicio' },
      ],
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      next();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.imgcontainer}>
        <Image style={styles.Image} source={IMAGEN} />

        <View style={styles.iconLogoContiner}>
          <Image style={styles.iconLogo} source={IconLogo} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('registroCiudadano')}>
          <View style={styles.buttonCredenciales}>
            <Text style={styles.textButtonSin}>Iniciar sesión con cuenta única</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={next}>
          <View style={styles.buttonSinCredenciales}>
            <Text style={styles.textButtonSin}>Ingresar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('terminos')}>
          <View style={styles.buttonCredenciales}>
            <Text style={{ color: '#502A3E', fontSize: 10 }}>Aviso de privacidad</Text>
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
    height: 25,
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
