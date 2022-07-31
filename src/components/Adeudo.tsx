import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import fonts from '../utils/fonts';

const Adeudo = ({
  padron,
  nombre,
  cargo,
  children,

}) => {
  const [isCollapsable, setIsCollapsable] = useState(true);

  useEffect(() => {
  }, []);

  const handleClick = () => {
    if (isCollapsable === true) {
      setIsCollapsable(false);
    } else {
      setIsCollapsable(true);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => handleClick()}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.text}>
              {padron}
              :
              {(nombre?.length < 35)
                ? `${nombre}`
                : `${nombre?.substring(0, 32)}...`}
            </Text>
            {
              cargo > 0 ? (
                <Text style={styles.text}>
                  $
                  {cargo}
                </Text>
              ) : 
                <Text style={styles.text}>
                  - Sin adeudos.
                </Text>
            }

          </View>
        </View>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={isCollapsable}>
        <View style={styles.childrenCard}>
          {children}
        </View>
      </Collapsible>
    </>
  );
};

export default Adeudo;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.85,
    height: 53,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    marginVertical: 3,
  },
  childrenCard: {
    width: Dimensions.get('window').width * 0.85,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    marginVertical: 3,
  },
  text: {
    color: 'black',
    width:180,
    fontFamily: fonts.light,
  },
  row: {
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  textLeft: {
    color: 'black',
    fontFamily: fonts.light,
    textAlign: 'right',
  },
});
