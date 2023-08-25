import React, { useState, useEffect } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet,
} from 'react-native';

const LoadingComponent = () => {
  const [message, setMessage] = useState('Cargando...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessage('Buscando, espere un momento...');
    }, 30000);

    const timer2 = setTimeout(() => {
      setMessage('Tenemos problemas con la conexión, espere...');
    }, 60000);

    // Clean up timers when component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <View style={{
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
    }}
    >
      <ActivityIndicator size="large" color="white" />
      <Text style={{ color: '#ffffff', marginTop: 10, fontSize: 12 }}>{message}</Text>
    </View>
  );
};

export default LoadingComponent;
