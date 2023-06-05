// External dependencies
import React from 'react';

// Internal dependencies
import WebViewPage from '../components/WebViewPage';

// Constants
const URI = 'https://juarez.gob.mx/noticias/presidente/';

const WebViewCabildoScreen = () => (
  <WebViewPage
    title="Últimas Noticias"
    uri={URI}
  />
);

export default WebViewCabildoScreen;
