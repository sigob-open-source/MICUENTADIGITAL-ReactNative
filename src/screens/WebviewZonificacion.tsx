import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewZonificacion = () => (
  <View style={{ flex: 1 }}>
    <Header item="Zonificación de Predio" />

    <View style={{
      flex: 1,
    }}
    >
      <WebView
        source={{ uri: 'https://gummfneibjlfaj4e.maps.arcgis.com/apps/webappviewer/index.html?id=6b35eaba2c1341949786e8300c91948a' }}
      />
    </View>
  </View>
);

export default WebviewZonificacion;
