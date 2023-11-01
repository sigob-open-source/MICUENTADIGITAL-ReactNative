import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import currency from 'currency.js';

import fonts from '../utils/fonts';

const CardItem = ({
  navegar, data, padron, cargo,
}) => (
  <TouchableWithoutFeedback>
    <Container>
      <Label>
        Clave:
        {' '}
        {
            cargo.motivo || 'sin descripcion'
          }
        {' | '}
        {
            cargo.descripcion || 'sin descripcion'
          }
        {'  '}
        {/* { currency(data.importes.importeTotal).format() || 0} */}
      </Label>

      {/* <Label2>
          {'| '}
          {cargo.tipo_de_cargo.periodo_fiscal.periodo || 0}
        </Label2> */}
      {/* <FontAwesome5
          name="chevron-right"
          size={14}
          solid
          color="#141414"
        /> */}
    </Container>
  </TouchableWithoutFeedback>
);

const Container = styled.View`
  background-color: #ffffff;
  flex-direction: row;

  width: 100%;
  border-radius: 10px;
  padding: 10px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 1px;
  elevation: 5;
  margin-vertical: 5px;
`;

const Label = styled.Text`
  font-family: ${fonts.light};
  font-weight: normal;
  color: #666666;
  font-size: 12px;
  flex: 1;
`;
const Label2 = styled.Text`
  font-family: ${fonts.light};
  font-weight: normal;
  color: #666666;
  font-size: 12px;
  margin-right: 15px;
  margin-left: 10px;

`;
export default CardItem;
