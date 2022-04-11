import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardMenu = ({ nombreItem }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer} />
    <Text style={{ color: 'black' }}>{nombreItem}</Text>
  </View>
);

export default CardMenu;

const styles = StyleSheet.create({
  card: {
    height: 104,
    width: 95,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    backgroundColor: 'red',
    height: 45,
    width: 45,
    margin: 5,
  },
});
