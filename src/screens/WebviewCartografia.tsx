// External dependencies
import React from 'react';

// Internal dependencies
import WebViewPage from '../components/WebViewPage/WebViewPage';

// Constants
const URI = 'https://gummfneibjlfaj4e.maps.arcgis.com/apps/webappviewer/index.html?id=f07e5784a1494079bcc935ad6679b165';

const WebViewCartografiaScreen = () => (
  <WebViewPage
    title="Cartografía"
    uri={URI}
  />
);

export default WebViewCartografiaScreen;
