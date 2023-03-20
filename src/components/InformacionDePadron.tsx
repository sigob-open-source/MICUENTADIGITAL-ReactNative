// External dependencies
import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Internal dependencies
import Card from './Card';
import Separator from './Separator';

// Types & Interfaces
interface InformacionDePadronProps {
  tipoDePadron: string;
  nombre: string;
  clave: string;
}

const InformacionDePadron = ({ tipoDePadron, nombre, clave }: InformacionDePadronProps) => (
  <Card>
    <Text style={styles.cardTitle}>
      Información de padrón
    </Text>

    <Separator topGap={8} />

    <Text style={styles.field}>
      Tipo:
    </Text>
    <Text style={styles.value}>
      {tipoDePadron}
    </Text>

    <Text style={styles.field}>
      Nombre:
    </Text>
    <Text style={styles.value}>
      {nombre}
    </Text>

    <Text style={styles.field}>
      Clave:
    </Text>
    <Text style={styles.value}>
      {clave}
    </Text>
  </Card>
);

const styles = StyleSheet.create({
  cardTitle: {
    color: '#364046',
    fontWeight: '700',
    fontSize: 14,
  },
  field: {
    fontSize: 14,
    color: '#818181',
    fontWeight: '500',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#010101',
    fontWeight: '700',
  },
});

export default InformacionDePadron;
