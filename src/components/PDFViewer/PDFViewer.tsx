/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';

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
