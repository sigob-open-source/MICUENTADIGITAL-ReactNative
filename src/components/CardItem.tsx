/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
// External dependencies
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

// Internal dependencies
import type { ConsultaInfraccion_Generic } from '../services/juarez-infracciones/types/consultaInfraccion';
import fonts from '../utils/fonts';

// Types & Interfaces
type TCargo = ConsultaInfraccion_Generic['motivos'][number];

interface ICardItem {
  cargo: TCargo;
}

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
  font-size: RFPercentage(0.03)px;
  flex: 1;
`;

const CardItem = ({ cargo }: ICardItem) => (
  <TouchableWithoutFeedback>
    <Container>
      <Label>
        Clave:
        {' '}
        {cargo.motivo || 'sin descripcion'}
        {' | '}
        {cargo.descripcion || 'sin descripcion'}
        {'  '}
      </Label>
    </Container>
  </TouchableWithoutFeedback>
);

export default CardItem;
