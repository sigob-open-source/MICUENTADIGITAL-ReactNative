import {
  StyleSheet,
  View,
  Linking,
  Image,
} from 'react-native';
import React from 'react';
import HeaderV2 from '../components/HeaderV2';
import Card from '../components/Card';

import Button from '../components/Button';

import IMAGE from '../../assets/imagenes/Addfiles-rafiki.png';

const DescargaFactura = ({ route: { params: response } }) => {
  const openLinkPDF = () => {
    if (response.reciboBase.pdf_de_rfc) {
      void Linking.openURL(response.reciboBase.pdf_de_rfc);
    }
    if (response.pdf_de_rfc) {
      void Linking.openURL(response.pdf_de_rfc);
    } else {
      console.log('====================================');
      console.log('error al quierer abrir pdf ', response);
      console.log('====================================');
    }
  };

  const openLinkXML = () => {
    if (response.reciboBase.xml_archivo) {
      void Linking.openURL(response.reciboBase.xml_archivo);
    }
    if (response?.xml_archivo) {
      void Linking.openURL(response.xml_archivo);
    } else {
      console.log('====================================');
      console.log('error al quierer abrir XML', response);
      console.log('====================================');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderV2 title="Descargar Factura" />
      <View style={styles.contentContainer}>

        <Card>
          <Image source={IMAGE} style={styles.tinyLogo} />

          <Button
            size="medium"
            text="Abrir PDF"
            style={styles.cta}

            onPress={openLinkPDF}
          />

          <Button
            size="medium"
            text="Abrir XML"
            style={styles.cta}

            onPress={openLinkXML}
          />
        </Card>

      </View>

    </View>
  );
};

export default DescargaFactura;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  cta: {
    marginTop: 10,
  },
  tinyLogo: {
    width: '100%',
    height: '60%',
  },
});
