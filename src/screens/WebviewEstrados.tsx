// External dependencies
import React from 'react';

// Internal dependencies
import WebViewPage from '../components/WebViewPage';

// Constants
const URI = 'https://www.juarez.gob.mx/notificacion-estrados/';

const WebViewEstradosScreen = () => (
  <WebViewPage
    title="Estrados"
    uri={URI}
  />
);

export default WebViewEstradosScreen;
