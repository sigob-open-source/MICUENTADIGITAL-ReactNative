// External dependencies
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependenices
import { RootStackParamList } from '../types/navigation';
import WebViewPage from '../components/WebViewPage';

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
