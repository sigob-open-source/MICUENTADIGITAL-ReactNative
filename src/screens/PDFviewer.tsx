// External dependencies
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import { RootStackParamList } from '../types/navigation';

// Types & Interfaces
type PDFViewerScreenProps = NativeStackScreenProps<RootStackParamList, 'pdfViewer'>;

const PDFViewerScreen = ({
  navigation,
  route: {
    params: { reciboB64 },
  },
}: PDFViewerScreenProps) => {
  const source = { uri: reciboB64 };

  const handleDownload = async () => {
    // Handle download logic here
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permisos requeridos',
        message:
            'Se requieren permisos para guardar archivos en el dispositivo. ',
        buttonNeutral: 'Preguntame más tarde',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const path = `${RNFetchBlob.fs.dirs.DownloadDir}/ticketdepago.pdf`;
      await RNFetchBlob.fs.writeFile(path, reciboB64.replace('data:application/pdf;base64,', ''), 'base64');
      console.log('ya paso por  aqui Archivo descargado');

      RNFetchBlob.fs.stat(path)
        .then((stats) => {
          if (stats.size > 0) {
            Alert.alert(
              'PDF descargado',
              'El PDF se ha descargado correctamente.',
              [
                {
                  text: 'Abrir archivo',
                  onPress: () => {
                    RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
                  },
                },
                {
                  text: 'OK',
                  style: 'cancel',
                },
              ],
            );
          } else {
            Alert.alert(
              'ERROR',
              'Hubo un problema con la descarga. Vuelva a intentarlo.',
              [
                {
                  text: 'OK',
                  style: 'cancel',
                },
              ],
            );
          }
        })
        .catch((error) => {
          Alert.alert(
            'ERROR',
            'Hubo un problema con la descarga. Vuelva a intentarlo.',
            [
              {
                text: 'OK',
                style: 'cancel',
              },
            ],
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
      />
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={handleDownload}>
          <View style={styles.button}>
            <Text style={{ color: '#FFFFFF' }}>Descargar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.reset({
          index: 0,
          routes: [{
            name: 'menuInicio',
          }],
        })}
        >
          <View style={styles.button}>
            <Text style={{ color: '#FFFFFF' }}>Regresar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  button: {
    backgroundColor: '#79142A',
    width: 150,
    height: 45,
    borderRadius: 10,
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
