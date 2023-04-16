// External dependencies
import React from 'react';

// External dependencies
import WebViewPage from '../components/WebViewPage';

// Constants
const URI = 'https://www.juarez.gob.mx/noticias/convocatorias/';

const WebViewConvocatoriasScreen = () => (
  <WebViewPage
    title="Convocatorias"
    uri={URI}
  />
);

export default WebViewConvocatoriasScreen;
