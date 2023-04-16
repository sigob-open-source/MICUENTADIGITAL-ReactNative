// External dependencies
import React from 'react';

// Internal dependencies
import WebViewPage from '../components/WebViewPage';

// Constants
const URI = 'https://www.juarez.gob.mx/facturacion/';

const WebViewFacturacionScreen = () => (
  <WebViewPage
    title="Facturación"
    uri={URI}
  />
);

export default WebViewFacturacionScreen;
