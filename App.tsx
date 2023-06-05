import React from 'react';
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Internal dependencies
import store, { persistor } from './src/store-v2';
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
import Tramites from './src/screens/tramitess';
import NetPayPagoScreen from './src/screens/netpayPago';
import DropDownAlertProvider from './src/components/DropDownAlertProvider';
import DetallesPadron from './src/screens/DetallesPadron';
import NetpayCustom from './src/screens/NetpayCustom';
import PagoRealizado from './src/screens/PagoRealizado';
import PDFViewerScreen from './src/screens/PDFviewer';
import WebViewCartografiaScreen from './src/screens/WebviewCartografia';
import WebViewZonificacion from './src/screens/WebviewZonificacion';
import WebViewEstradosScreen from './src/screens/WebviewEstrados';
import WebViewFacturacionScreen from './src/screens/WebviewFacturacion';
import WebViewTramitesScreen from './src/screens/WebviewTramites';
import WebviewAdeudos from './src/screens/WebviewAdeudos';
import WebViewConvocatoriasScreen from './src/screens/WebviewConvocatorias';
import WebViewCabildo from './src/screens/WebviewCabildo';
import LoginScreen from './src/screens/Login';
import InicioFactura from './src/screens/InicioDeFacturacion';
import InformacionRecibo from './src/screens/InformacionDelRecibo';
import InformacionFiscal from './src/screens/InformacionFiscal';
import InicioRegistroCiudadano from './src/screens/InicioRegistroCiudadano';
import Walkthrout from './src/screens/Walkthrough';
import TipoDeRegistro from './src/screens/TipoDeRegistro';
import InformacionDeQueja from './src/screens/InformacionDeQueja';
import ArchivosDeQuejas from './src/screens/ArchivosDeQuejas';
import InfoServidorPublico from './src/screens/InfoServidorPublico';
import OtrosPagos from './src/screens/OtrosPagos';
// Pagos Diversos Screens
import BuscarPadronScreen from './src/screens/PagosDiversos/BuscarPadron';
import ConfirmarPadronScreen from './src/screens/PagosDiversos/ConfirmarPadron';
import BusquedaDeCargosScreen from './src/screens/PagosDiversos/BusquedaDeCargos';
import ConfiguracionDeCargoScreen from './src/screens/PagosDiversos/ConfiguracionDeCargo';
import ResumenDeCargosScreen from './src/screens/PagosDiversos/ResumenDeCargos';
import ResumenDePagoScreen from './src/screens/PagosDiversos/ResumenDePago';
import SeleccionarTipoDePadronScreen from './src/screens/PagosDiversos/SelecionarTipoDePadron';
// Registro de ciudadanos Screens
import RegistroCiudadano from './src/screens/RegistroCiudadano';
import CodigoScreen from './src/screens/CodigoAcceso';

// Initialize the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
  colors: DefaultTheme.colors,
  dark: false,
};

const AppContainer = () => (
  <NavigationContainer theme={theme}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="walkthrout" component={Walkthrout} />
      <Stack.Screen
        name="infoServidorPublico"
        component={InfoServidorPublico}
      />
      <Stack.Screen name="tipoDeRegistro" component={TipoDeRegistro} />
      <Stack.Screen name="informacionQueja" component={InformacionDeQueja} />
      <Stack.Screen name="archivosDeQuejas" component={ArchivosDeQuejas} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="informacionRecibo" component={InformacionRecibo} />
      <Stack.Screen name="informacionFiscal" component={InformacionFiscal} />
      <Stack.Screen name="registroCiudadano" component={InicioRegistroCiudadano} />
      <Stack.Screen name="registroScreen" component={RegistroCiudadano} />
      <Stack.Screen name="codigoScreen" component={CodigoScreen} />
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
      <Stack.Screen
        name="pdfViewer"
        options={{ animation: 'none' }}
        component={PDFViewerScreen}
      />
      <Stack.Screen name="detallesPadron" component={DetallesPadron} />
      <Stack.Screen name="pagoRealizado" component={PagoRealizado} />
      <Stack.Screen name="otrosPagos" component={OtrosPagos} />
      <Stack.Screen
        name="netpaypago"
        options={{ animation: 'none' }}
        component={NetPayPagoScreen}
      />
      <Stack.Screen name="netpayCustom" component={NetpayCustom} />
      <Stack.Screen
        name="cartografia"
        options={{ animation: 'none' }}
        component={WebViewCartografiaScreen}
      />
      <Stack.Screen
        name="zonoficacion"
        options={{ animation: 'none' }}
        component={WebViewZonificacion}
      />
      <Stack.Screen
        name="cobildo"
        options={{ animation: 'none' }}
        component={WebViewCabildo}
      />
      <Stack.Screen
        name="convocatorias"
        options={{ animation: 'none' }}
        component={WebViewConvocatoriasScreen}
      />
      <Stack.Screen
        name="webTramites"
        options={{ animation: 'none' }}
        component={WebViewTramitesScreen}
      />
      <Stack.Screen
        name="webAdeudos"
        options={{ animation: 'none' }}
        component={WebviewAdeudos}
      />
      <Stack.Screen
        name="webFacturacion"
        options={{ animation: 'none' }}
        component={WebViewFacturacionScreen}
      />
      <Stack.Screen
        name="estrados"
        options={{ animation: 'none' }}
        component={WebViewEstradosScreen}
      />

      <Stack.Screen
        name="seleccionarTipoDePadron"
        options={{ animation: 'none' }}
        component={SeleccionarTipoDePadronScreen}
      />
      <Stack.Screen
        name="busquedaPadron"
        options={{ animation: 'none' }}
        component={BuscarPadronScreen}
      />
      <Stack.Screen
        name="confirmarPadron"
        options={{ animation: 'none' }}
        component={ConfirmarPadronScreen}
      />
      <Stack.Screen
        name="busquedaDeCargos"
        options={{ animation: 'none' }}
        component={BusquedaDeCargosScreen}
      />
      <Stack.Screen
        name="configuracionDeCargo"
        options={{ animation: 'none' }}
        component={ConfiguracionDeCargoScreen}
      />
      <Stack.Screen
        name="resumenDeCargos"
        options={{ animation: 'none' }}
        component={ResumenDeCargosScreen}
      />
      <Stack.Screen
        name="resumenDePago"
        options={{ animation: 'none' }}
        component={ResumenDePagoScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DropDownAlertProvider>
        <AppContainer />
      </DropDownAlertProvider>
    </PersistGate>
  </Provider>
);
