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
  const [cargos, setCargos] = useState();

  useEffect(() => {
    if (cargo !== null) {
      setCargos(reduceArrCargos());
    }
    // (cargo !== null) ? cargo = Number(cargo.toFixed(2)) : null;
  }, []);

  const handleClick = () => {
    if (isCollapsable === true) {
      setIsCollapsable(false);
    } else {
      setIsCollapsable(true);
    }
  };

  const reduceArrCargos = () => {
    const {
      descuentos_especiales,
      actualizaciones,
      recargos,
      descuentos_aplicables,
      gastos,
      importe,
    } = cargo;
    let adeudo_total;
    let descuentos_de_actualizacion = 0;
    let descuentos_de_recargos = 0;
    let descuentos_gastos_totales = 0;
    let multa_recargos = 0;
    let multa_gastos = 0;
    let descuentos_de_recargos_str = '';
    let descuentos_de_actualizaciones_str = '';
    let descuentos_de_gastos_str = '';
    const recargo_total = recargos
      .reduce((accum, curr) => accum + curr.importe_total, 0);

    recargos.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      let ttlMultaRec;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce((accum, curr) => accum + curr.importe_total, 0);
        descuentos.forEach((i) => {
          descuentos_de_recargos_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      if (item?.es_multa) {
        const filteredRecargos = recargos.filter(((recargo) => recargo.es_multa === true));
        ttlMultaRec = filteredRecargos
          .reduce((accum, curr) => accum + curr.importe_total, 0);
      } else {
        ttlMultaRec = 0;
      }
      multa_recargos += ttlMultaRec;
      descuentos_de_recargos += ttlDesc;
    });
    gastos.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      let ttlMultaGto;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce((accum, curr) => accum + curr.importe_total, 0);
        descuentos.forEach((i) => {
          descuentos_de_gastos_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      if (item.es_multa) {
        const filteredMultas = gastos.filter((gasto) => gasto.es_multa === true);
        ttlMultaGto = filteredMultas
          .reduce((accum, curr) => accum + curr.importe, 0);
      } else {
        ttlMultaGto = 0;
      }
      descuentos_gastos_totales += ttlDesc;
      multa_gastos += ttlMultaGto;
    });

    actualizaciones.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce((accum, curr) => accum + curr.importe_total, 0);
        descuentos.forEach((i) => {
          descuentos_de_actualizaciones_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      descuentos_de_actualizacion += ttlDesc;
    });

    const descuentos_especiales_totales = descuentos_especiales
      .reduce((accum, curr) => accum + curr.importe_total, 0);

    const descuentos_aplicables_total = descuentos_aplicables
      .reduce((accum, curr) => accum + curr.importe_total, 0);

    const actualizaciones_totales = actualizaciones
      .reduce((accum, curr) => accum + curr.importe_total, 0);

    const gastos_totales = gastos
      .reduce((accum, curr) => accum + curr.importe, 0);

    const descuentos_totales = descuentos_aplicables_total + descuentos_especiales_totales;
    const multas_totales = multa_gastos + multa_recargos;
    adeudo_total = importe
    - descuentos_totales
    + (recargo_total - descuentos_de_recargos)
    + (actualizaciones_totales - descuentos_de_actualizacion)
    + (gastos_totales - descuentos_gastos_totales)
    + multas_totales;
    adeudo_total = adeudo_total;

    return {
      descuentos_de_actualizaciones_str,
      descuentos_de_recargos_str,
      descuentos_de_gastos_str,
      descuentos_gastos_totales,
      descuentos_de_recargos,
      descuentos_de_actualizacion,
      descuentos_aplicables_total,
      descuentos_especiales_totales,
      descuentos_totales,
      multas_totales,
      multa_recargos,
      multa_gastos,
      actualizaciones_totales,
      recargo_total: recargo_total - multa_recargos,
      adeudo_total,
      gastos_totales: gastos_totales - multa_gastos,
    };
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => handleClick()}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.text}>
              {padron}
              :
              {(nombre.length < 35)
                ? `${nombre}`
                : `${nombre.substring(0, 32)}...`}
            </Text>
            <Text style={styles.text}>
              $
              {cargo?.importe.toFixed(2) || 0}
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
                {cargo?.descripcion || 0}
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
                {cargo?.importe.toFixed(2) || 0}
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
                {cargo?.importe.toFixed(2) || 0}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Actualización
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $
                {' '}
                {cargo?.descuentos_de_actualizaciones_str || '0.00'}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Recargos
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.textLeft}>
                $
                {' '}
                {cargo?.descuentos_de_recargos_str || '0.00'}
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
                $
                {' '}
                {cargo?.descuentos_de_gastos_str || '0.00'}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Descuento
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
