import currency from 'currency.js';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet, Text, TouchableWithoutFeedback,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { RFPercentage } from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { ConsultaInfraccion_Activa } from '../services/juarez-infracciones/types/consultaInfraccion';
import fonts from '../utils/fonts';

// Types & Interfaces
interface IAdeudoProps {
  data: ConsultaInfraccion_Activa;
}

const Adeudo = ({
  data,
  children,
}: React.PropsWithChildren<IAdeudoProps>) => {
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
              fontSize: RFPercentage(0.03),
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
    width: '100%',
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
    fontSize: RFPercentage(0.03),
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
    fontSize: RFPercentage(0.03),
    color: '#313030',
    fontWeight: '400',
    marginTop: 4,
  },
});
