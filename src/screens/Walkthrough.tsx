import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ImagePage1 from '../../assets/imagenes/Private-data.png';
import ImagePage2 from '../../assets/imagenes/Receipt-pana.png';
import ImagePage3 from '../../assets/imagenes/User-flow-pana.png';
import { useAppSelector } from '../store-v2/hooks';
import { RootStackParamList } from '../types/navigation';

type WalkthroughScreenProps = NativeStackScreenProps<RootStackParamList, 'walkthrout'>;

const Walkthrough = ({ navigation }: WalkthroughScreenProps) => {
  const isLoggedIn = useAppSelector((state) => Boolean(state.auth.ciudadano));

  useEffect(() => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'menuInicio' }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const WalkthroughList = [
    {
      id: 1,
      title: 'Bienvenido a tu app ciudadana',
      descripcion: 'Encuentra maravillosas funciones, como pagos de adeudos y Trámites.',
      image: ImagePage1,
    },
    {
      id: 2,
      title: 'Pago de Adeudos',
      descripcion: 'Realiza pagos y consultas desde la comodidad de tu celular.',
      image: ImagePage2,
    },
    // {
    //   id: 3,
    //   title: 'Visita redes sociales oficiales',
    //   descripcion: '¡Ahora pondrás dar seguimientos a tus quejas y solicitudes personalmente y saber en qué proceso va al momento!!',
    //   image: ImagePage3,
    // },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('loginScreen')}>
          <Text style={styles.saltartxt}>Saltar</Text>
        </TouchableWithoutFeedback> */}

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
    </SafeAreaView>
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
    fontSize: 14,
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
    fontSize: 18,
    color: '#362D71',
    fontWeight: '700',
    textAlign: 'center',
  },
  imagenIlu: {
    height: 325,
    width: 325,
  },
  happyTry: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  subtxt: {
    color: '#6F7173',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
  },
});
