import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/types/navigation';

// Screens
import HomeScreen from './src/screens/Home';
import Solicitud from './src/screens/Solicitud';

// Initialize the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="solicitud" component={Solicitud} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default () => (
  <AppContainer />
);
 