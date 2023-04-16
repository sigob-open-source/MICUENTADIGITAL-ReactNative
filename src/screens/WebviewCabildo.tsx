// External dependencies
import React from 'react';

// Internal dependencies
import WebViewPage from '../components/WebViewPage';

// Constants
const URI = 'https://www.juarez.gob.mx/cabildo/';

const WebViewCabildoScreen = () => (
  <WebViewPage
    title="Cabildo"
    uri={URI}
  />
);

export default WebViewCabildoScreen;
