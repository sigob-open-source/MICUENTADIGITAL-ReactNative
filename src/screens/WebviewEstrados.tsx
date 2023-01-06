import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewEstrados = (props) => (
  <View style={{ flex: 1 }}>
    <Header item="Estrados" />
    <View style={{
      flex: 1,
    }}
    >
      <WebView
        source={{ uri: 'https://www.juarez.gob.mx/notificacion-estrados/' }}
      />
    </View>
  </View>
);

export default WebviewEstrados;
