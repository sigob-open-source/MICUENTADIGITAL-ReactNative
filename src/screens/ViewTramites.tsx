// External dependencies
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

// Internal dependenices
import WebViewPage from '../components/WebViewPage';
import { RootStackParamList } from '../types/navigation';

// Types & Interfaces
type IWebViewTramitesProps = NativeStackScreenProps<RootStackParamList, 'webTramites'>;

// Misc
const getUri = (tramiteId: number | string) => `https://juarezconectado.juarez.gob.mx/tramites/tramite/${tramiteId}?webView=1`;

const WebViewTramitesScreen = ({ route: { params: { item } } }: IWebViewTramitesProps) => (
  <WebViewPage
    title="Trámites"
    uri={getUri(item.id)}
  />
);

export default WebViewTramitesScreen;
