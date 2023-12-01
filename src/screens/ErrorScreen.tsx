import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

export default function ErrorScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{
        padding: 24, flex: 1, paddingTop: 120, alignItems: 'center',
      }}
      >
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#831D45' }}>Sucedió algo inesperado</Text>
        <Text style={{ fontSize: 14, fontWeight: '500', textAlign: 'center' }}>Si ya realizó su pago y su cuenta continua activa, favor de acudir a la Recaudación Municipal</Text>
      </View>
      <View style={styles.containerButton}>

        <TouchableOpacity onPress={() => navigation.reset({
          index: 0,
          routes: [{
            name: 'menuInicio',
          }],
        })}
        >
          <View style={styles.button}>
            <Text style={{ color: '#FFFFFF' }}>Entendido</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    flexDirection: 'row',
    backgroundColor: '#EDF2F5',
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#79142A',
    width: 180,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    margin: 10,
  },
});
