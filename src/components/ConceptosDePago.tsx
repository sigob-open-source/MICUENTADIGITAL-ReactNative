/* eslint-disable react/require-default-props */
// External dependencies
import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, ViewStyle,
} from 'react-native';
import currency from 'currency.js';

// Internal dependencies
import Card from './Card';
import Separator from './Separator';
import useTotal from '../hooks/useTotal';

// Types & Interfaces
interface ConceptoDePago {
  id: number;
  description: string;
  total: number;
}

interface ConceptosDePagoProps {
  conceptos?: ConceptoDePago[];
  style?: ViewStyle;
}

const conceptosMock = Array.from<ConceptoDePago>({ length: 3 }).map((_, idx) => ({
  id: idx,
  description: 'ESPECTACULOS TEATRALES, DE REVISTA Y DE VARIEDADES KERMESES, BAILES, CONCIERTOS Y CONFERENCIAS.',
  total: 1876.48,
}));

const ConceptosDePago = ({
  conceptos = conceptosMock,
  style = {},
}: ConceptosDePagoProps) => {
  const importes = useMemo(() => conceptos.map((x) => x.total), [conceptos]);

  const { formatedValues: { roundedCents, roundedTotal } } = useTotal({ importes });

  const formatedImportes = useMemo(() => importes.map((x) => currency(x).format()), [importes]);

  return (
    <Card style={[styles.container, style]}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Conceptos de pago
        </Text>

        <Text style={styles.subtitle}>
          Cargos a pagar
        </Text>
      </View>

      <Separator gap={8} />

      <Text style={styles.total}>
        {roundedTotal}
      </Text>

      <Text style={styles.totalDisclaimer}>
        * Los centavos del monto total estan siendo redondeados (
        {roundedCents}
        ).
      </Text>

      <Separator topGap={8} />

      <View style={[styles.listItem, { marginBottom: 8 }]}>
        <Text style={[styles.field, styles.col1]}>
          Descripción
        </Text>

        <Text style={[styles.field, styles.col2]}>
          Importe
        </Text>
      </View>

      {conceptos.map((item, idx) => (
        <React.Fragment key={item.id}>
          <View style={styles.listItem}>
            <Text style={[styles.value, styles.col1]}>
              {item.description}
            </Text>

            <Text style={[styles.value, styles.col2]}>
              {formatedImportes[idx]}
            </Text>
          </View>

          <Separator gap={8} />
        </React.Fragment>
      ))}

      <Text style={styles.additionalChargesDisclaimer}>
        * El importe a pagar no incluye los cargos adicionales.
      </Text>

    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 5,
    borderTopColor: '#62C35C',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#364046',
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle: {
    color: '#9F9F9F',
    fontWeight: '700',
    fontSize: 14,
  },
  total: {
    fontSize: 20,
    color: '#585858',
    fontWeight: '700',
    textAlign: 'center',
  },
  totalDisclaimer: {
    color: '#9F9F9F',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },
  field: {
    fontSize: 14,
    color: '#525050',
    fontWeight: '700',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#747474',
    fontWeight: '400',
  },
  col1: {
    flex: 1,
  },
  col2: {
    paddingLeft: 10,
    minWidth: '20%',
    maxWidth: '50%',
    textAlign: 'right',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  additionalChargesDisclaimer: {
    color: '#E8AB35',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 17,
  },
});

export default ConceptosDePago;
