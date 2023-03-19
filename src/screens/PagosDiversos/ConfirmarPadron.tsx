// External dependencies
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Internal dependencies
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/HeaderV2';
import InformacionDePadron from '../../components/InformacionDePadron';
import { RootStackParamList } from '../../types/navigation';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'confirmarPadron'>;

type ConfirmarPadronScreenProps = NavigationProps;

/**
 * Pantalla de confirmación de padron empleada en
 * el flujo de pagos diversos.
 *
 * En esta pantalla el usuario puede ver la información
 * del padrón que buscó para después proceder a añadir
 * cargos.
 */
const ConfirmarPadronScreen = ({ navigation }: ConfirmarPadronScreenProps) => (
  <>
    <Header
      title="Pagos Diversos"
    />

    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View>
          <Card style={styles.deleteContainer}>
            <Text style={styles.deleteText}>
              Borrar Búsqueda
            </Text>

            <Icon
              name="trash-alt"
              size={16}
              color="#ED5B56"
            />
          </Card>
        </View>
      </TouchableWithoutFeedback>

      <InformacionDePadron
        tipoDePadron="Ciudadano"
        nombre="John Doe"
        clave="CI-22-000021"
      />

      <Button
        text="Continuar"
        style={styles.cta}
        onPress={() => navigation.navigate('busquedaDeCargos')}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  deleteContainer: {
    marginBottom: 12,
    borderRightWidth: 4,
    borderRightColor: '#ED5B56',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteText: {
    color: '#ED5B56',
    fontWeight: '700',
    fontSize: 14,
  },
  container: {
    padding: 20,
  },
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
  cta: {
    marginTop: 28,
  },
});

export default ConfirmarPadronScreen;
