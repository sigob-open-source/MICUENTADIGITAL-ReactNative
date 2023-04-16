// External dependencies
import React from 'react';

// Internal dependencies
import WebViewPage from '../components/WebViewPage/WebViewPage';

// Constants
const URI = 'https://gummfneibjlfaj4e.maps.arcgis.com/apps/webappviewer/index.html?id=6b35eaba2c1341949786e8300c91948a';

const WebViewZonificacionScreen = () => (
  <WebViewPage
    title="Zonificación de Predio"
    uri={URI}
  />
);

export default WebViewZonificacionScreen;
