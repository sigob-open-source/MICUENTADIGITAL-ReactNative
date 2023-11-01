import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import currency from 'currency.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import fonts from '../utils/fonts';

const Adeudo = ({
  padron,
  data,
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
              {` ${data.conductor.nombre || 'Sin Nombre'} ${data.conductor.apellidoPaterno || ''} ${data.conductor.apellidoMaterno || ''}` }
            </Text>

          </View>

          <View style={styles.line} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <View style={styles.databox}>

              <Text style={styles.infoTex}>
                {`Total Infracción/Motivos:\n${currency(data.importes.totalInfraccion).format()}` }
              </Text>

              <Text style={styles.infoTex}>
                {`Grua:\n${currency(data.importes.grua).format()}` }
              </Text>

              <Text style={styles.infoTex}>
                {`Grua Operadora:\n${currency(data.importes.gruaOperadora).format()}` }
              </Text>

              <Text style={styles.infoTex}>
                {`Hospedaje:\n${currency(data.importes.hospedaje).format()}` }
              </Text>

            </View>

            <View style={styles.databox}>

              <Text style={styles.infoTex}>
                {`Servicio Medico:\n${currency(data.importes.servicioMedico).format()}` }
              </Text>

              <Text style={styles.infoTex}>
                {`Recargos:\n${currency(data.importes.recargos).format()}` }
              </Text>

              <Text style={styles.infoTex}>
                {`Descuentos:\n${currency(data.importes.descuentos).format()}` }
              </Text>

              <Text style={styles.infoTex}>
                {`Gastos de Cobranza:\n${currency(data.importes.gastosCobranza).format()}` }
              </Text>

            </View>
          </View>

          <View style={styles.line} />

          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          }}
          >
            <Text style={{
              fontSize: 11,
              color: '#313030',
              fontWeight: '400',
              marginRight: 5,
            }}
            >
              Ver Motivos
            </Text>

            <FontAwesome5
              name="eye"
              size={13}
              solid
              color="#313030"
            />
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
    height: 210,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 3,
    marginVertical: 3,
  },
  childrenCard: {
    width: Dimensions.get('window').width * 0.85,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#313030',
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: '100%',
    marginTop: 5,
  },
  textLeft: {
    color: 'black',
    fontFamily: fonts.light,
    textAlign: 'right',
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#E6E6E6',
    margin: 5,
  },
  databox: {
    flex: 1,
    justifyContent: 'center',

  },
  infoTex: {
    fontSize: 11,
    color: '#313030',
    fontWeight: '400',
    marginTop: 4,
  },
});
