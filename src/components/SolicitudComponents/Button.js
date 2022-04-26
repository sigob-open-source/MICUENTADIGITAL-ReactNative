import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ButtonRequest = (props) => {
  const [shouldShow, setShouldShow] = useState(props.showArrow);
  return (

    <View style={styles.optionCard}>
      <View style={styles.collapsibleContent}>
        <MaterialCommunityIcons size={40} name="chart-box-outline" color="black" />
        <Text style={styles.collapsibleText}>{props.texto}</Text>
        {
          shouldShow ? (
            <View style={{ flex: 1, marginRight: '5%' }}>
              <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-down" color="black" />
            </View>
          ) : null
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  collapsibleContent: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapsibleText: {
    fontWeight: '500',
    marginLeft: '10%',
    fontSize: 20,
    color: 'black',
  },
  optionCard: {
    width: 333,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
});

export default ButtonRequest;
