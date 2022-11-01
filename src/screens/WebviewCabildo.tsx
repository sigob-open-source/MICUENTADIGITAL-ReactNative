import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewCabildo = (props) => (
  <View style={{ flex: 1 }}>
    <Header item="Cabildo" />

    <View style={{
      flex: 1,
    }}
    >
      <WebView
        source={{ uri: 'https://www.juarez.gob.mx/cabildo/' }}
      />
    </View>
  </View>
);

export default WebviewCabildo;
