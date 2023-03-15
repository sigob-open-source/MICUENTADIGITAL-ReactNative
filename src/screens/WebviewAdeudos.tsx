import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewAduedos = (props) => (
  <View style={{ flex: 1 }}>
    <Header item="Pagos" />
    <View style={{
      flex: 1,
    }}
    >
      <WebView
        source={{ uri: 'https://juarezconectado.migob.digital/pagos' }}
      />
    </View>
  </View>
);

export default WebviewAduedos;
