import React from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Pdf from 'react-native-pdf';

// const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

const PDFviewer = ({ route: { params: { responseRecibo } } }) => {
  const navigation = useNavigation();
  const source = { uri: responseRecibo.base64 };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
      />
      <View style={styles.containerButton}>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={{ color: '#FFFFFF' }}>Descargar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('pagos')}>
          <View style={styles.button}>
            <Text style={{ color: '#FFFFFF' }}>Volver a pagos</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PDFviewer;

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
