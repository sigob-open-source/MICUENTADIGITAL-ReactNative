// External dependencies
import React from 'react';

// Internal dependencies
import WebViewPage from '../components/WebViewPage';

// Constants
const URI = 'https://www.juarez.gob.mx/facturacion/';

const WebViewFacturacionScreen = ({ route: { params: { reciboURL } } }) => (
  <WebViewPage
    title="Facturación"
    uri={reciboURL}
  />
);

export default WebViewFacturacionScreen;
