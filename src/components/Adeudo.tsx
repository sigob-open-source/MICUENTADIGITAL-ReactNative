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

}) => {
  const [isCollapsable, setIsCollapsable] = useState(true);

  useEffect(() => {
    console.log('newAdeudo');
    console.log(cargo);
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
            <Text style={styles.text}>
              {padron}
              :
              {nombre}
            </Text>
            <Text style={styles.text}>
              $
              {cargo.importe}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={isCollapsable}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.text}>
              Periodo Fiscal
            </Text>
            <Text style={styles.text}>
              2022
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Descripción
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                {cargo.descripcion}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Adeudo Total
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $
                {' '}
                {cargo.importe}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Importe Base
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $
                {' '}
                {cargo.importe}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Actualización
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $ 0.00
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Recargos
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $ 0.00
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Multa
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $ 0.00
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Gastos
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $ 0.00
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Desc.
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $ 0.00
              </Text>
            </View>
          </View>
        </View>

      </Collapsible>
    </>

  );
};

export default Adeudo;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.85,

    paddingHorizontal: 15,
    borderRadius: 30,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    marginVertical: 3,
  },
  text: {
    color: 'black',
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
