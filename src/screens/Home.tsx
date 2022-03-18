import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import CardMenu from '../components/CardMenu';

const Home = () => (
  <View style={styles.container}>
    <Header item="Home" />
    <View style={styles.menuContainer}>
      <CardMenu nombreItem="Pagos nomina" />
    </View>
    <Header item="Home" />
  </View>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});
