import React from 'react';
import {
  StyleSheet, Text, View, Dimensions,
} from 'react-native';
import fonts from '../utils/fonts';

const Adeudo = ({ padron, nombre, cantidad }) => (
  <View style={styles.card}>
    <Text style={styles.text}>
      {padron}
      :
      {' '}
      {nombre}
    </Text>
    <Text style={styles.text}>
      $
      {cantidad}
    </Text>
  </View>
);

export default Adeudo;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.85,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    marginVertical: 3,
  },
  text: {
    color: 'black',
    fontFamily: fonts.light,
  },
});
