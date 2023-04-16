import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewTramites = ({ route: { params: { item } } }) => (
  <View style={{ flex: 1 }}>
    <Header item="Trámites" />
    <View style={{
      flex: 1,
    }}
    >
      <WebView
        source={{ uri: `https://juarezconectado.juarez.gob.mx/tramites/tramite/${item.id}?webView=1` }}
      />
    </View>
  </View>
);

export default WebviewTramites;
