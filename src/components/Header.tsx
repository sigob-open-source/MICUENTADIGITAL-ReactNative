import {
  StyleSheet, View, Text, TouchableWithoutFeedback, Image,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, CommonActions } from '@react-navigation/native';
import colors from '../utils/colors';

const navigation = useNavigation;

const Header = (props) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback>
      <View style={styles.logoContainer}>
        <FontAwesome5
          name="bars"
          size={23}
          solid
          color="#782745"
        />
      </View>
    </TouchableWithoutFeedback>

    <View style={styles.textContainer}>
      <Text
        numberOfLines={3}
        style={styles.tituloHeader}
      >
        {props.item}
      </Text>
    </View>

    <View style={styles.logoContainerIma}>
      <Image
        style={styles.logo}
        source={require('../../assets/imagenes/logo.png')}
      />
    </View>

  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tituloHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#782745',
    textAlign: 'center',
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },
  logoContainerIma: {
    flex: 0,
    justifyContent: 'center',
  },
  notifContainer: {
    height: 35,
    width: 35,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    borderBottomWidth: 0.2,
    borderColor: '#55636E',
  },
  logo: {
    resizeMode: 'contain',
    height: 20,
    width: 75,
  },
});

export default Header;
