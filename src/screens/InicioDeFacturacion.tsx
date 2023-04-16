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
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useNotification } from '../components/DropDownAlertProvider';
import { getRecibo } from '../services/padrones';

import IMAGEHELP from '../../assets/imagenes/asistencia-contribuyente.png';

const InicioDeFacturacion = () => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recibo, setRecibo] = useState(null);

  const notify = useNotification();
  const navigation = useNavigation();

  const showAlert = (massage, tipo, titulo) => notify({
    type: tipo,
    title: titulo,
    message: massage,
  });

  const BuscarRecibo = () => {
    if (searchText) {
      showAlert();
    }
  };

  const handleSearchRecibo = async () => {
    setIsLoading(true);
    if (searchText) {
      const [_recibo] = await getRecibo({ q: searchText });
      navigation.navigate('informacionRecibo');
      if (_recibo) {
        setRecibo(_recibo);
      } else {
        showAlert('Se encontró un recibo con ese Folio.', 'info', 'Datos Vereficados');
      }
    } else {
      showAlert('Favor de introducir el Folio del Recibo', 'info', 'Verifique sus datos');
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header item="Recibo de Pago" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerModal}>

          <View style={styles.modaling}>
            <Text style={styles.title}>Folio de Recibo</Text>
            <View style={{
              height: 1,
              width: '100%',
              backgroundColor: '#F1F1F1',
              marginVertical: 10,
            }}
            />

            <View style={styles.textInputContainer}>
              <TextInput
                color="black"
                placeholderTextColor="#C4C4C4"
                placeholder="Buscar Folio de Recibo"
                fontSize={11}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>

            <TouchableOpacity onPress={handleSearchRecibo}>
              <View style={styles.button}>
                <Text style={styles.textButton}>Consultar Recibo</Text>
              </View>
            </TouchableOpacity>

            <View style={{
              height: 1,
              width: '100%',
              backgroundColor: '#F1F1F1',
              marginVertical: 10,
            }}
            />

            <View style={styles.imageContainer}>
              <Image style={styles.image} source={IMAGEHELP} />
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modaling: {
    backgroundColor: 'white',
    height: 400,
    width: '85%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4E585F',
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
  button: {
    backgroundColor: '#582E44',
    width: 230,
    height: 40,
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
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  imageContainer: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InicioDeFacturacion;
