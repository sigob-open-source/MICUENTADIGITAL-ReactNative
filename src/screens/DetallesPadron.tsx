import React, { useEffect, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import fonts from '../utils/fonts';
import Header from '../components/Header';

const DetallesPadron = ({ route }) => {
  const [cargo, setCargo] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params.cargo !== undefined) {
      setCargo(route.params.cargo);
    }
  }, []);

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
                {route.params?.cargo.importe?.toFixed(2) || '0.00'}
              </TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Gastos</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {route.params?.cargo.gastos_totales || '0.00'}
              </TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Descuento</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {route.params?.cargo.descuentos_totales || '0.00'}
              </TextLeft>
            </View>
          </Row>
          <Row>
            <DataLabel>Recargos</DataLabel>
            <View style={{ flex: 1 }}>
              <TextLeft>
                $
                {' '}
                {route.params?.cargo.recargo_total || '0.00'}
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
