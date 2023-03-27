import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewFacturacion = (props) => (
  <View style={{ flex: 1 }}>
    <Header item="Facturación" />
    <View style={{
      flex: 1,
    }}
    >
      <WebView
        source={{ uri: 'https://www.juarez.gob.mx/facturacion/' }}
      />
    </View>
  </View>
);

export default WebviewFacturacion;
