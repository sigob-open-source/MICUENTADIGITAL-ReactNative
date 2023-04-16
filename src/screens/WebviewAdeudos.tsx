// External dependencies
import React from 'react';

// Internal dependencies
import WebViewPage from '../components/WebViewPage';

// Constants
const URI = 'https://juarezconectado.migob.digital/pagos';

const WebViewAdeudosScreen = () => (
  <WebViewPage uri={URI} title="Pagos" />
);

export default WebViewAdeudosScreen;
