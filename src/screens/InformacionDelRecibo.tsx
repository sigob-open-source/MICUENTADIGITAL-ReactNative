import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import IMAGEheader from '../../assets/imagenes/reciboimg.png';

const InformacionDelRecibo = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#B7C1C8' }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={IMAGEheader} />
      </View>
      <View style={{ flex: 2 }} />
      <View style={styles.cardContainer}>
        <Text style={styles.titleCard}>Informacion del Recibo</Text>

        <View style={{
          backgroundColor: '#F1F1F1',
          width: '100%',
          height: 1,
          marginVertical: 10,
        }}
        />
        <View style={styles.infoContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.subtitle}>Folio del Recibo:</Text>
            <Text style={styles.subsubtitle}>G2-0000007-2022</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.subtitle}>Folio de Facturacion:</Text>
            <Text style={styles.subsubtitle}>FA-0000059-2022</Text>
          </View>
        </View>

        <View style={{
          backgroundColor: '#F1F1F1',
          width: '100%',
          height: 1,
          marginVertical: 3,
        }}
        />

        <View style={styles.infoContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.subtitle}>Fecha:</Text>
            <Text style={styles.subsubtitle}>20-09-2022</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.subtitle}>Importe Total:</Text>
            <Text style={styles.subsubtitle}>$192.00</Text>
          </View>
        </View>

        <View style={{
          backgroundColor: '#F1F1F1',
          width: '100%',
          height: 1,
          marginVertical: 3,
        }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('informacionFiscal')}>
          <View style={styles.cardButton}>
            <Text style={styles.textButton}>Ingresar Informacion Fiscal</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('inicioFactura')}>
          <View style={styles.cardButtonFit}>
            <Text style={styles.textButtonFit}>Salir</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default InformacionDelRecibo;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    height: '112%',
    width: '112%',
    top: -150,
    left: -20,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  cardContainer: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 40,
    borderTopStartRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  titleCard: {
    fontWeight: '700',
    fontSize: 15,
    color: '#582E44',
  },
  subtitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#4E585F',
  },
  infoContainer: {
    backgroundColor: 'red',
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 2,
    backgroundColor: '#ffffff',
  },
  cardButton: {
    backgroundColor: '#582E44',
    width: 260,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textButton: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: 12,
  },
  cardButtonFit: {
    width: 260,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    color: '#582E44',
  },
  textButtonFit: {
    fontWeight: '500',
    color: '#582E44',
    fontSize: 12,
  },
  subsubtitle: {
    fontWeight: '400',
    fontSize: 11,
    color: '#4E585F',
  },
});
