import React from 'react';
import {
  StyleSheet, Text, View, TouchableWithoutFeedback,
} from 'react-native';

const Header = ({ item }) => (
  <View style={styles.background}>
    <View style={styles.logoContainer} />

    <View style={styles.textContainer}>
      <Text style={styles.tituloHeader}>{item}</Text>
    </View>

    <TouchableWithoutFeedback onPress={() => console.log('Hola me presionaste')}>
      <View style={styles.logoContainer} />
    </TouchableWithoutFeedback>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#79142A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    padding: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tituloHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  logoContainer: {
    height: 41,
    width: 41,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
