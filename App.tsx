import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Internal dependencies
import DropDownAlertProvider from './src/components/DropDownAlertProvider';
import ErrorScreen from './src/screens/ErrorScreen';
import LoginScreen from './src/screens/Login';
import MenuInicio from './src/screens/MenuInicio';
import NetPayPagoScreen from './src/screens/netpayPago';
import PagoPadron from './src/screens/PagoPadron';
// Registro de ciudadanos Screens
import PDFViewerScreen from './src/screens/PDFviewer';
import TerminsCondiciones from './src/screens/TerminsCondiciones';
import Tramites from './src/screens/Tramites';
import ViewPagoNetpay from './src/screens/ViewPagoNetpay';
import ViewTramites from './src/screens/ViewTramites';
import Walkthrough from './src/screens/Walkthrough';
import WebViewCabildo from './src/screens/WebviewCabildo';
import WebViewCartografiaScreen from './src/screens/WebviewCartografia';
import WebViewEstradosScreen from './src/screens/WebviewEstrados';
import WebViewFacturacionScreen from './src/screens/WebviewFacturacion';
import WebViewZonificacionScreen from './src/screens/WebviewZonificacion';
import store, { persistor } from './src/store-v2';
import { RootStackParamList } from './src/types/navigation';

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
      <Stack.Screen name="walkthrough" component={Walkthrough} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="menuInicio" component={MenuInicio} />
      <Stack.Screen name="pagoPadron" component={PagoPadron} />
      <Stack.Screen name="pagoNetpay" component={ViewPagoNetpay} />
      <Stack.Screen name="terminos" component={TerminsCondiciones} />
      <Stack.Screen
        name="pdfViewer"
        options={{ animation: 'none' }}
        component={PDFViewerScreen}
      />
      <Stack.Screen
        name="tramites"
        options={{ animation: 'none' }}
        component={Tramites}
      />
      <Stack.Screen
        name="netpaypago"
        options={{ animation: 'none' }}
        component={NetPayPagoScreen}
      />
      <Stack.Screen
        name="cartografia"
        options={{ animation: 'none' }}
        component={WebViewCartografiaScreen}
      />
      <Stack.Screen
        name="errorScreen"
        options={{ animation: 'none' }}
        component={ErrorScreen}
      />
      <Stack.Screen
        name="cobildo"
        options={{ animation: 'none' }}
        component={WebViewCabildo}
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
        name="zonoficacion"
        options={{ animation: 'none' }}
        component={WebViewZonificacionScreen}
      />
      <Stack.Screen
        name="webTramites"
        options={{ animation: 'none' }}
        component={ViewTramites}
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
