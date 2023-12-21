// External dependencies
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import currency from 'currency.js';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Header from '../components/Header';
import { RootStackParamList } from '../types/navigation';

// Types & Interfaces
type PDFViewerScreenProps = NativeStackScreenProps<RootStackParamList, 'pdfViewer'>;

const PDFViewerScreen = ({
  navigation,
  route,
}: PDFViewerScreenProps) => {
  const { params: datos } = route;
  const data = datos.datoParaRecibo;

  return (
    <>
      <Header item="" />
      <View style={styles.container}>
        <View
          style={styles.pdf}
        >

          <View style={{
            backgroundColor: 'white', width: '100%', height: 59, padding: 15,
          }}
          >
            <Text style={{ fontWeight: '400', color: '#4F4F4F', fontSize: RFPercentage(0.04) }}>
              Pago realizado:
            </Text>
          </View>
          <View style={{
            backgroundColor: 'white',
            width: '100%',
            height: 110,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Text style={{ fontSize: RFPercentage(0.03), color: '#727272', fontWeight: '400' }}>
              Pagaste:
            </Text>
            <Text style={{ fontWeight: '800', fontSize: RFPercentage(0.07), color: '#7D0025' }}>
              {currency(data.total).format()}
            </Text>
          </View>
          <View style={{
            backgroundColor: 'white', width: '100%', flex: 1, padding: 20,
          }}
          >
            <View style={{
              backgroundColor: '#F4F4F4', width: '100%', height: 40, padding: 5, justifyContent: 'center',
            }}
            >
              <Text style={{ fontSize: RFPercentage(0.03), fontWeight: '600', color: '#A9A9A9' }}>
                Fecha:
              </Text>
              <Text style={{ fontSize: RFPercentage(0.03), fontWeight: '700', color: '#575757' }}>
                {data.fechaActual}
              </Text>
            </View>

            <View style={{
              marginTop: 10, backgroundColor: '#F4F4F4', width: '100%', height: 40, padding: 5, justifyContent: 'center',
            }}
            >
              <Text style={{ fontSize: RFPercentage(0.03), fontWeight: '600', color: '#A9A9A9' }}>
                Pagado por:
              </Text>
              <Text style={{ fontSize: RFPercentage(0.03), fontWeight: '700', color: '#575757' }}>
                {data.nombre}
                {' '}
                {data.lastName}
                {' '}
              </Text>
            </View>

            <View style={{
              marginTop: 10, backgroundColor: '#F4F4F4', width: '100%', height: 40, padding: 5, justifyContent: 'center',
            }}
            >
              <Text style={{ fontSize: RFPercentage(0.03), fontWeight: '600', color: '#A9A9A9' }}>
                Número de autorización:
              </Text>
              <Text style={{ fontSize: RFPercentage(0.03), fontWeight: '700', color: '#575757' }}>
                {data.numeroAut}
              </Text>
            </View>

            <View style={{
              backgroundColor: '#F4F4F4',
              marginTop: 15,
              width: '100%',
              height: 60,
              padding: 10,
            }}
            >
              <Text style={{ fontSize: RFPercentage(0.03), fontWeight: '400', color: '#6A6A6A' }}>
                Tu pago se acreditará dentro de las próximas 24 horas hábiles.
                {' '}
                {'\n'}
                Si tienes dudas con el pago de tu servicio, favor de contactarse con
                ventanilla en el municipio.
              </Text>

            </View>
          </View>
        </View>
        <View style={styles.containerButton}>

          <TouchableOpacity onPress={() => navigation.reset({
            index: 0,
            routes: [{
              name: 'menuInicio',
            }],
          })}
          >
            <View style={styles.button}>
              <Text style={{ color: '#FFFFFF' }}>Entendido!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#79142A',
    width: 180,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    margin: 10,
  },
  containerButton: {
    flexDirection: 'row',
    backgroundColor: '#EDF2F5',
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PDFViewerScreen;
