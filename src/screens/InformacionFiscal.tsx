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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={styles.titleCard}>Informacion Fiscal</Text>

          <View style={styles.textInputContainer}>
            <TextInput
              color="black"
              placeholderTextColor="#C4C4C4"
              placeholder="Ingresar RFC"
              fontSize={11}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              color="black"
              placeholderTextColor="#C4C4C4"
              placeholder="Código Postal"
              fontSize={11}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              color="black"
              placeholderTextColor="#C4C4C4"
              placeholder="Razón Social"
              fontSize={11}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              color="black"
              placeholderTextColor="#C4C4C4"
              placeholder="Correo Electrónico"
              fontSize={11}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              color="black"
              placeholderTextColor="#C4C4C4"
              placeholder="Uso de la Factura"
              fontSize={11}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              color="black"
              placeholderTextColor="#C4C4C4"
              placeholder="Régimen Fiscal"
              fontSize={11}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <TouchableOpacity>
            <View style={styles.cardButton}>
              <Text style={styles.textButton}>Facturar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('inicioFactura')}>
            <View style={styles.cardButtonFit}>
              <Text style={styles.textButtonFit}>Salir</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
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
  textInputContainer: {
    marginVertical: 5,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#F1F1F1',
    fontSize: 2,
  },
});
