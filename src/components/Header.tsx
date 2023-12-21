import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import LOGO from '../../assets/imagenes/logo.png';

interface IHeaderProps {
  item: string;
  hideBackButton?: boolean;
}

const Header = ({ item, hideBackButton }: IHeaderProps) => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const canRenderBackButton = navigation.canGoBack() && !hideBackButton;

  return (
    <View style={[styles.outerContainer, { paddingTop: insets.top }]}>
      <View style={styles.container}>

        {canRenderBackButton && (
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <Icon name="chevron-left" size={18} />
            </View>
          </TouchableWithoutFeedback>
        )}

        <View style={styles.logoContainerIma}>
          <Image
            style={styles.logo}
            source={LOGO}
          />
        </View>

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
    position: 'absolute',
    textAlign: 'center',
    left: 0,
    right: 0,
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
  backButton: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    width: 25,
  },
});

export default Header;
