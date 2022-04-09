import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/types/navigation';

// Screens
import HomeScreen from './src/screens/Home';
import MenuInicio from './src/screens/MenuInicio';
import Solicitud from './src/screens/Solicitud';
import Peticiones from './src/screens/Peticiones';
import DirectorioFunc from './src/screens/DirectorioFuncionarios';
import OficinasAtencion from './src/screens/OficinasAtencion';
import VerSolicitud from './src/screens/VerSolicitud';
import VerSolicitudes from './src/screens/VerSolicitudes';
import Login from './src/screens/Login';
// Initialize the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="verSolicitudes" component={VerSolicitudes} />
      <Stack.Screen name="menuInicio" component={MenuInicio} />

      <Stack.Screen name="verSolicitud" component={VerSolicitud} />
      <Stack.Screen name="solicitud" component={Solicitud} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="oficinaAtencion" component={OficinasAtencion} />
      <Stack.Screen name="dirfuncionario" component={DirectorioFunc} />
      <Stack.Screen name="peticiones" component={Peticiones} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default () => (
  <AppContainer />
);
