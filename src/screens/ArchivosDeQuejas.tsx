import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const ArchivosDeQuejas = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header item="Registro de Archivos" />

      <View style={styles.container}>
        <View style={styles.booleanEvidencia}>
          <Text> Tienes evidencia de los Hechos?</Text>
          <View style={{
            width: 1,
            height: '60%',
            backgroundColor: '#E1E2E4',
            marginHorizontal: 10,
          }}
          />
          <View style={styles.checkContainer}>
            <View style={styles.check}>
              <View style={styles.ball} />
            </View>
          </View>
        </View>

        <View style={styles.archivosContainer}>
          <Text style={styles.titleCard}>
            Si cuenta con pruebas de los hechos, favor de anexarlos.
          </Text>
          <View style={styles.imageContainer}>
            <FontAwesome5
              name="box-open"
              size={60}
              solid
              color="#717171"

            />
            <Text style={styles.txtBox}>Podras incluir hasta 5 archivos en los formatos: </Text>
            <Text style={styles.txtBox}>JPG, PNG Y PDF</Text>
            <Text style={styles.txtBox2}>Tamaño Maximo permitido por archivo: 2MG</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('infoServidorPublico')}>
            <View style={styles.button}>
              <Text style={styles.txtButton}>Subir Archivos</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
};

export default ArchivosDeQuejas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  archivosContainer: {
    backgroundColor: '#FFFFFF',
    height: 350,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    color: 'black',
  },
  titleCard: {
    fontWeight: '400',
    fontSize: 12,
  },
  imageContainer: {
    height: '70%',
    width: '100%',
    backgroundColor: '#F1F1F1',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 45,
    width: '100%',
    backgroundColor: '#5F2A46',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  booleanEvidencia: {
    width: '100%',
    height: 70,
    backgroundColor: '#ffffff',
    marginBottom: 13,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    color: 'black',
  },
  checkContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    width: 45,
    height: 25,
    backgroundColor: '#E86861',
    borderRadius: 100,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  ball: {
    height: 18.5,
    width: 18.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  txtButton: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  txtBox: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
  },
  txtBox2: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '400',
    color: '#999999',
    bottom: 0,
    marginBottom: 12,
  },
});
