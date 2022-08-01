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

// Initialize the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    >
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
      <Stack.Screen name="netpaypago" options={{ animation: 'none' }} component={NetpayPago} />
      <Stack.Screen name="detallesPadron" component={DetallesPadron} />
      <Stack.Screen name="netpayCustom" component={NetpayCustom} />
      <Stack.Screen name="pagoRealizado" component={PagoRealizado} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default () => (
  <DropdownalertProvider>
    <AppContainer />
  </DropdownalertProvider>
);
