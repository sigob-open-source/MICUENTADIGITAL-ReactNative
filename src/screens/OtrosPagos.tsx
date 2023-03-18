import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import Square from '../components/CardPagos';
import Header from '../components/Header';
import ConnectionCheck from '../components/internetChecker';
import Banner from '../components/Banner';
import colors from '../utils/colors';

const OtrosPagos = () => (
  <View style={styles.container}>
    <Header
      item="Inicio"
    />

  </View>
);

export default OtrosPagos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 100,
    marginTop: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
});
