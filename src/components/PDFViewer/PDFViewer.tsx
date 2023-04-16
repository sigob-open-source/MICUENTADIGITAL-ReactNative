/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Text,
  Alert,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';

interface Props {
  visible: boolean;
  base64: string;
  onClose: () => void;
}

const ModalPdfViewer: React.FC<Props> = ({ visible, base64, onClose }) => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  useEffect(() => {
    if (base64.startsWith('data')) {
      setPdfUri(base64);
    } else {
      setPdfUri(`data:application/pdf;base64,${base64}`);
    }
  }, [base64]);

  const handleClose = () => {
    onClose();
  };

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
      const path = `${RNFetchBlob.fs.dirs.DownloadDir}/ordendepago.pdf`;
      await RNFetchBlob.fs.writeFile(path, base64, 'base64');
      console.log('Archivo descargado');

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
            console.log('El archivo descargado no tiene contenido.');
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
          console.log('Error al obtener información del archivo:', error);
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
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        {
          Boolean(pdfUri) && (
            <Pdf
              style={{ flex: 1 }}
              source={{ uri: pdfUri! }}
            />
          )
        }

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDownload}>
            <Text style={styles.buttonText}>Descargar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalPdfViewer;
