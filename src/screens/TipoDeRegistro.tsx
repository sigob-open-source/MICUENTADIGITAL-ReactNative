import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const TipoDeRegistro = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header item="Tipo de Registro" />

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('informacionQueja')}>
          <View style={styles.cardCheck}>
            <View style={styles.iconContainer} />
            <Text style={styles.textSelext}>Mandar Queja Anonima</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.cardCheck}>
          <View style={styles.iconContainer} />
          <Text style={styles.textSelext}>Realizar Queja con Registro</Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default TipoDeRegistro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardCheck: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    color: 'black',
  },
  iconContainer: {
    backgroundColor: '#E5E5E5',
    height: 50,
    width: 60,
    marginRight: 15,
    borderRadius: 5,
  },
  textSelext: {
    fontSize: 13,
    fontWeight: '500',
    color: '#353535',
  },
  ImageStyle: {
    height: 50,
    backgroundColor: 'red',
    width: 50,
    resizeMode: 'stretch',
  },
});
