import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const QRbutton = () => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.button}>
      <View style={styles.buttonHelp}>
        <Icon name="fa-qrcode" size={45} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  </View>
);

export default QRbutton;

const styles = StyleSheet.create({
  footer: {
    height: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonHelp: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: '#5F2A46',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    position: 'absolute',
    top: -110,
  },
});
