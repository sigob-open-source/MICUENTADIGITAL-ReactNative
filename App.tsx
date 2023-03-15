import React, {
} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';

// Screens
import SolicitudSelector from './src/screens/solicitudSelectorView';
import VerSolicitudes from './src/screens/VerSolicitudes';
import VerSolicitud from './src/screens/VerSolicitud';
import MenuInicio from './src/screens/MenuInicio';
import Solicitud from './src/screens/Solicitud';
import Peticiones from './src/screens/Peticiones';
import DirectorioFunc from './src/screens/DirectorioFuncionarios';
import OficinasAtencion from './src/screens/OficinasAtencion';
import Pagos from './src/screens/Pagos';
import PagoPadron from './src/screens/PagoPadron';
import Tramites from './src/screens/tramites';
import NetpayPago from './src/screens/netpayPago';
import DropdownalertProvider from './src/components/DropDowAlertProvider';
import DetallesPadron from './src/screens/DetallesPadron';
import NetpayCustom from './src/screens/NetpayCustom';
import PagoRealizado from './src/screens/PagoRealizado';
import PDFviewer from './src/screens/PDFviewer';
import WebviewCartografia from './src/screens/WebviewCartografia';
import WebviewZonificacion from './src/screens/WebviewZonificacion';
import WebviewEstrados from './src/screens/WebviewEstrados';
import WebviewFacturacion from './src/screens/WebviewFacturacion';
import WebviewTramites from './src/screens/WebviewTramites';
import WebviewAdeudos from './src/screens/WebviewAdeudos';
import WebviewConvocatorias from './src/screens/WebviewConvocatorias';
import WebviewCobildo from './src/screens/WebviewCabildo';
import LoginScreen from './src/screens/Login';
import Login from './src/screens/Login';
import InicioFactura from './src/screens/InicioDeFacturacion';
import InformacionRecibo from './src/screens/InformacionDelRecibo';
import InformacionFiscal from './src/screens/InformacionFiscal';
import RegistroCiudadano from './src/screens/InicioRegistroCiudadano';
import Walkthrout from './src/screens/Walkthrough';
import TipoDeRegistro from './src/screens/TipoDeRegistro';
import InformacionDeQueja from './src/screens/InformacionDeQueja';
import ArchivosDeQuejas from './src/screens/ArchivosDeQuejas';
import InfoServidorPublico from './src/screens/InfoServidorPublico';

// Initialize the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="walkthrout" component={Walkthrout} />
      <Stack.Screen name="infoServidorPublico" component={InfoServidorPublico} />
      <Stack.Screen name="tipoDeRegistro" component={TipoDeRegistro} />
      <Stack.Screen name="PDFviewer" component={PDFviewer} />
      <Stack.Screen name="informacionQueja" component={InformacionDeQueja} />
      <Stack.Screen name="archivosDeQuejas" component={ArchivosDeQuejas} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="informacionRecibo" component={InformacionRecibo} />
      <Stack.Screen name="informacionFiscal" component={InformacionFiscal} />
      <Stack.Screen name="registroCiudadano" component={RegistroCiudadano} />
      <Stack.Screen name="inicioFactura" component={InicioFactura} />
      <Stack.Screen name="menuInicio" component={MenuInicio} />
      <Stack.Screen name="pagoPadron" component={PagoPadron} />
      <Stack.Screen name="pagos" component={Pagos} />
      <Stack.Screen name="solicitud" component={Solicitud} />
      <Stack.Screen name="peticiones" component={Peticiones} />
      <Stack.Screen name="dirfuncionario" component={DirectorioFunc} />
      <Stack.Screen name="oficinaAtencion" component={OficinasAtencion} />
      <Stack.Screen name="verSolicitud" component={VerSolicitud} />
      <Stack.Screen name="solicitudSelect" component={SolicitudSelector} />
      <Stack.Screen name="verSolicitudes" component={VerSolicitudes} />
      <Stack.Screen name="tramites" component={Tramites} />
      <Stack.Screen name="pdfViewer" options={{ animation: 'none' }} component={PDFviewer} />
      <Stack.Screen name="detallesPadron" component={DetallesPadron} />
      <Stack.Screen name="pagoRealizado" component={PagoRealizado} />
      <Stack.Screen name="netpaypago" options={{ animation: 'none' }} component={NetpayPago} />
      <Stack.Screen name="netpayCustom" component={NetpayCustom} />
      <Stack.Screen name="cartografia" options={{ animation: 'none' }} component={WebviewCartografia} />
      <Stack.Screen name="zonoficacion" options={{ animation: 'none' }} component={WebviewZonificacion} />
      <Stack.Screen name="cobildo" options={{ animation: 'none' }} component={WebviewCobildo} />
      <Stack.Screen name="convocatorias" options={{ animation: 'none' }} component={WebviewConvocatorias} />
      <Stack.Screen name="webTramites" options={{ animation: 'none' }} component={WebviewTramites} />
      <Stack.Screen name="webAdeudos" options={{ animation: 'none' }} component={WebviewAdeudos} />
      <Stack.Screen name="webFacturacion" options={{ animation: 'none' }} component={WebviewFacturacion} />
      <Stack.Screen name="estrados" options={{ animation: 'none' }} component={WebviewEstrados} />

    </Stack.Navigator>
  </NavigationContainer>
);

export default () => (
  <DropdownalertProvider>
    <AppContainer />
  </DropdownalertProvider>
);
