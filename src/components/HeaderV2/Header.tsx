/* eslint-disable react/require-default-props */
// External dependencies
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

// Internal dependencies
import LOGO from '../../../assets/imagenes/logo.png';

// Types & Interfaces
interface HeaderProps {
  title?: string;
  hideBackButton?: boolean;
  disableShadow?: boolean;
}

const Header = ({
  title,
  hideBackButton,
  disableShadow = false,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const shouldRenderBackButton = navigation.canGoBack() && !hideBackButton;

  return (
    <View
      style={[
        styles.outerContainer,
        { paddingTop: insets.top },
        disableShadow ? {} : styles.shadow]}
    >
      <View style={[styles.innerContainer]}>
        <View style={styles.leftCtaContainer}>
          {shouldRenderBackButton && (
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View style={styles.backButton}>
                <Icon name="chevron-left" size={18} />
              </View>
            </TouchableWithoutFeedback>
          )}
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
    </View>
  );
};

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
    fontSize: RFPercentage(0.04),
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
  backButton: {
    width: 30,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
