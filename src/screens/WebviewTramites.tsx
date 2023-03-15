import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewTramites = (props) => (
  <View style={{ flex: 1 }}>
    <Header item="Facturacion" />
    <View style={{
      flex: 1,
    }}
    >
      <WebView
        source={{ uri: 'https://juarezconectado.migob.digital/tramites' }}
      />
    </View>
  </View>
);

export default WebviewTramites;
