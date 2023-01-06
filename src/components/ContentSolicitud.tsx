import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableWithoutFeedback,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import fonts from '../utils/fonts';

const ContentSolicitud = ({ fecha, solicitud }) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push('verSolicitud', { solicitud })}>
      <View style={styles.contentSolicitud}>
        <View style={styles.rectangle} />
        <Text style={styles.text}>
          Solicitud
          {' '}
          {fecha.split('T')[0]}
        </Text>
        <MaterialIcons style={{ textAlignVertical: 'center', textAlign: 'right' }} size={40} name="navigate-next" color="black" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contentSolicitud: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontFamily: fonts.medium,
    textAlignVertical: 'center',
    fontSize: 14,
    lineHeight: 17,
    marginHorizontal: 15,
    marginVertical: 16,
  },
  rectangle: {
    backgroundColor: 'gray',
    height: 75,
    width: 75,
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  image: {
    resizeMode: 'cover',
    height: 75,
    width: 75,
    borderRadius: 5,
  },
});

export default ContentSolicitud;
