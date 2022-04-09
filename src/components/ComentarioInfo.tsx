import React from 'react';
import {
  StyleSheet, Text, View, TouchableWithoutFeedback,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ComentarioInfo = ({
  headText, subText, iconName, hipervinculo,
}) => (
  <View style={styles.comment}>
    <View>
      <View style={styles.circle}>
        <MaterialIcons style={{ textAlign: 'center' }} size={30} color="black" name={iconName} />
      </View>
    </View>
    <View style={styles.texts}>
      <Text style={styles.headText}>{headText}</Text>
      <Text style={[styles.subText, (hipervinculo) ? styles.hipervinculo : undefined]}>{subText}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  headText: {
    color: 'black',
    fontWeight: 'bold',
  },
  subText: {
    color: 'black',
  },
  circle: {
    backgroundColor: '#DBDBDB',
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: 'center',
  },
  texts: {
    marginLeft: 8,
    marginRight: 20,
  },
  hipervinculo: {
    color: 'blue',
  },
});

export default ComentarioInfo;
