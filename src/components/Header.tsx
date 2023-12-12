import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LOGO from '../../assets/imagenes/logo.png';

interface IHeaderProps {
  item: string;
}

const Header = ({ item }: IHeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.outerContainer, { paddingTop: insets.top }]}>
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.logoContainerIma}>
            <Image
              style={styles.logo}
              source={LOGO}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.textContainer}>
          <Text
            numberOfLines={3}
            style={styles.tituloHeader}
          >
            {item}
          </Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: -75,

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
  outerContainer: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
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
