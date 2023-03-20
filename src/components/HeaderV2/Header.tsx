/* eslint-disable react/require-default-props */
// External dependencies
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Internal dependenices
import LOGO from '../../../assets/imagenes/logo.png';

// Types & Interfaces
interface HeaderProps {
  title?: string;
  leftComponent?: JSX.Element;
  disableShadow?: boolean;
}

const Header = ({
  title,
  leftComponent,
  disableShadow = false,
}: HeaderProps) => (
  <View style={styles.outerContainer}>
    <SafeAreaView>
      <View style={[styles.innerContainer, disableShadow ? {} : styles.shadow]}>
        <View style={styles.leftCtaContainer}>
          { leftComponent }
        </View>

        <Text
          numberOfLines={3}
          style={styles.headline}
        >
          { title }
        </Text>

        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logo} />
        </View>
      </View>
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#cccc',
  },
  innerContainer: {
    minHeight: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 15,
    fontWeight: '800',
    color: '#782745',
    textAlign: 'center',
    maxWidth: '50%',
  },
  leftCtaContainer: {
    position: 'absolute',
    left: 20,
  },
  logoContainer: {
    position: 'absolute',
    right: 20,
  },
  logo: {
    resizeMode: 'contain',
    height: 20,
    width: 75,
  },
});

export default Header;
