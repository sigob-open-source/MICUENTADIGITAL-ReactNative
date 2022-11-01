import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewConvocatorias = (props) => (
  <View style={{ flex: 1 }}>
    <Header item="Convocatorias" />

    <View style={{
      flex: 1,
    }}
    >
      <WebView
        source={{ uri: 'https://www.juarez.gob.mx/noticias/convocatorias/' }}
      />
    </View>
  </View>
);

export default WebviewConvocatorias;
