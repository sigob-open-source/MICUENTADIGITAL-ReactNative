import React, { useEffect, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import fonts from '../utils/fonts';
import Header from '../components/Header';

const DetallesPadron = ({ route }) => {
  const [data, setData] = useState();
  const [cargos, setCargos] = useState();
  const [cargo, setCargo] = useState();

  const navigation = useNavigation();

  console.log(JSON.stringify(route.params.cargo, null, 2));

  useEffect(() => {
    if (route.params.cargo !== undefined) {
      setCargo(reduceArrCargos());
    }
  }, []);

  useEffect(() => {}, [cargo]);

  const reduceArrCargos = () => {
    const {
      descuentos_especiales,
      actualizaciones,
      recargos,
      descuentos_aplicables,
      gastos,
      importe,
    } = route.params?.cargo;
    let adeudo_total;
    let descuentos_de_actualizacion = 0;
    let descuentos_de_recargos = 0;
    let descuentos_gastos_totales = 0;
    let multa_recargos = 0;
    let multa_gastos = 0;
    let descuentos_de_recargos_str = '';
    let descuentos_de_actualizaciones_str = '';
    let descuentos_de_gastos_str = '';
    const recargo_total = recargos.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    recargos.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      let ttlMultaRec;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_recargos_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      if (item?.es_multa) {
        const filteredRecargos = recargos.filter(
          (recargo) => recargo.es_multa === true,
        );
        ttlMultaRec = filteredRecargos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
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
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_gastos_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      if (item.es_multa) {
        const filteredMultas = gastos.filter((gasto) => gasto.es_multa === true);
        ttlMultaGto = filteredMultas.reduce(
          (accum, curr) => accum + curr.importe,
          0,
        );
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
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_actualizaciones_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      descuentos_de_actualizacion += ttlDesc;
    });

    const descuentos_especiales_totales = descuentos_especiales.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const descuentos_aplicables_total = descuentos_aplicables.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const actualizaciones_totales = actualizaciones.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const gastos_totales = gastos.reduce(
      (accum, curr) => accum + curr.importe,
      0,
    );

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
    <Container>
      <Header title="Detalles de Padron" />
      <MenuContainer>
        <TitleLabel>{route.params?.nombrePadron}</TitleLabel>
        <Linepx />
        <>
          <Row>
            <DataLabel>Periodo Fiscal</DataLabel>
            <DataLabel>{route.params.cargo.tipo_de_cargo.periodo_fiscal.periodo}</DataLabel>
          </Row>
          <Row>
            <DataLabel>Descripción</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>{route.params?.cargo?.descripcion}</TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Adeudo Total</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {cargo?.adeudo_total?.toFixed(2) || '0.00'}
              </TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Importe Base</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {route.params?.cargo?.importe?.toFixed(2) || '0.00'}
              </TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Actualización</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {cargo?.descuentos_de_actualizaciones_str || '0.00'}
              </TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Recargos</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {cargo?.descuentos_de_recargos_str || '0.00'}
              </TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Multa</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>$ 0.00</TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Gastos</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {cargo?.descuentos_de_gastos_str || '0.00'}
              </TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Descuento</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {cargo?.descuentos_aplicables_total || '0.00'}
              </TextLeft>
            </View>
          </Row>
        </>

        {route.params.selectType ? (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('cargosPadrones', {
                data: route.params.data,
              });
            }}
          >
            <TitleLabel>Seleccionar</TitleLabel>
          </TouchableWithoutFeedback>
        ) : null}
      </MenuContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #eff4f8;
`;
const MenuContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const TitleLabel = styled.Text`
  font-family: ${fonts.bold};
  font-weight: bold;
  color: #353535;
  font-size: 25px;
  margin-horizontal: 5px;
`;

const DataLabel = styled.Text`
  font-family: ${fonts.medium};
  color: #353535;
  font-size: 15px;
`;

const Linepx = styled.View`
  height: 1.5px;
  width: 100%;
  background-color: #d5d5d5;
  margin-vertical: 15px;
`;

const SelectButton = styled.View`
  height: 55px;
  background-color: white;
  border-radius: 25px;
  padding-horizontal: 20px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Row = styled.View`
  align-items: center;
  height: 50px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const TextLeft = styled.Text`
  color: black;
  font-family: ${fonts.light};
  text-align: right;
`;

export default DetallesPadron;
