import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const WebviewCartografia = () => (
  <View style={{ flex: 1 }}>
    <Header item="Cartografía Digital" />

    <View style={{
      flex: 1,
    }}
    >
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://gummfneibjlfaj4e.maps.arcgis.com/apps/webappviewer/index.html?id=f07e5784a1494079bcc935ad6679b165' }}
      />
    </View>
  </View>
);

export default WebviewCartografia;
