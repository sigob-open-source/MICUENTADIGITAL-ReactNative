import {
  StyleSheet, View, Text, TouchableWithoutFeedback, Image,
} from 'react-native';
import React from 'react';
import colors from '../utils/colors';

const Header = (props) => (
  <View style={styles.container}>

    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require('../../assets/imagenes/logo_horizontal.png')}
      />
    </View>

    <View style={styles.textContainer}>
      <Text
        numberOfLines={3}
        style={styles.tituloHeader}>{props.item}</Text>
    </View>

    <TouchableWithoutFeedback>
      <View style={styles.logoContainer}>
        <Image style={styles.notifContainer} source={props.imgnotif} />
      </View>
    </TouchableWithoutFeedback>

  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tituloHeader: {
    color: 'white',
    width:100,
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoContainer: {
    height: 41,
    width: 41,
    borderRadius: 10,
  },
  notifContainer: {
    height: 35,
    width: 35,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  container: {
    zIndex:100,
    position:'absolute',
    flexDirection: 'row',
    height: 66,
    width: '100%',
    backgroundColor: colors.principal,
    overflow:'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.secundario,
  },
  logo: {
    resizeMode: 'contain',
    height: 43,
    width: 100,
  },
});

export default Header;
