import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Header from '../components/Header';
import { RootStackParamList } from '../types/navigation';

type ErrorScreenProps = NativeStackScreenProps<
RootStackParamList,
'errorScreen'
>;

const ErrorScreen = ({ navigation }: ErrorScreenProps) => (
  <View style={{ flex: 1 }}>
    <Header item="" />

    <View
      style={{
        padding: 24,
        flex: 1,
        paddingTop: 120,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: RFPercentage(0.04), fontWeight: '700', color: '#831D45' }}>
        Sucedió algo inesperado
      </Text>
      <Text style={{ fontSize: RFPercentage(0.04), fontWeight: '500', textAlign: 'center' }}>
        Si ya realizó su pago y su cuenta continua activa, favor de acudir a
        la Recaudación Municipal
      </Text>
    </View>
    <View style={styles.containerButton}>
      <TouchableOpacity
        onPress={() => navigation.reset({
          index: 0,
          routes: [
            {
              name: 'menuInicio',
            },
          ],
        })}
      >
        <View style={styles.button}>
          <Text style={{ color: '#FFFFFF' }}>Entendido</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

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

export default ErrorScreen;
