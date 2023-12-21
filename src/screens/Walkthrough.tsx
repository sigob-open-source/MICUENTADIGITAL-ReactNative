import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import ImagePage2 from '../../assets/imagenes/MULTA.png';
import ImagePage1 from '../../assets/imagenes/Private-data.jpeg';
import type { RootStackParamList } from '../types/navigation';

type WalkthroughScreenProps = NativeStackScreenProps<RootStackParamList, 'walkthrough'>;

const Walkthrough = ({ navigation }: WalkthroughScreenProps) => {
  const insets = useSafeAreaInsets();

  const WalkthroughList = [
    {
      id: 1,
      title: 'Bienvenido a Tu App Juárez Conectado',
      descripcion: 'Paga y factura desde la comodidad de tu casa u oficina',
      image: ImagePage1,
    },
    {
      id: 2,
      title: 'Pago de Adeudos',
      descripcion: 'Realiza pagos y consultas desde la comodidad de tu celular.',
      image: ImagePage2,
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Swiper
        paginationStyle={{
          position: 'absolute',
          bottom: '6%',
        }}
        activeDotColor="#E14848"
        activeDotStyle={{ width: 20, height: 8 }}
      >
        {WalkthroughList.map((item) => (
          <View style={styles.happyTry} key={item.id}>
            <Text style={styles.txtDescripcion}>{item.title}</Text>
            <Text style={styles.subtxt}>{item.descripcion}</Text>
            <Image style={styles.imagenIlu} source={item.image} />
          </View>
        ))}
      </Swiper>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('loginScreen')}>
        <View style={styles.button}>
          <Text style={styles.textButton}>Vamos a Comenzar!</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Walkthrough;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFE',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  saltartxt: {
    color: '#BD6A6A',
    fontSize: RFPercentage(0.04),
    fontWeight: '500',
    position: 'absolute',
    right: 20,
    top: 20,
    height: 20,
  },
  button: {
    height: 50,
    width: '90%',
    backgroundColor: '#582E44',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  txtDescripcion: {
    fontSize: RFPercentage(0.05),
    color: '#362D71',
    fontWeight: '700',
    textAlign: 'center',
  },
  imagenIlu: {
    height: 325,
    width: 325,
    resizeMode: 'contain',
  },
  happyTry: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: RFPercentage(0.04),
    fontWeight: '500',
  },
  subtxt: {
    color: '#6F7173',
    fontSize: RFPercentage(0.03),
    fontWeight: '300',
    textAlign: 'center',
  },
});
