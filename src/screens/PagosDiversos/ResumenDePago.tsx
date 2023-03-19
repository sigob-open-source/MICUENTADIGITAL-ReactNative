// External dependencies
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import Button from '../../components/Button';
import ConceptosDePago from '../../components/ConceptosDePago';
import Header from '../../components/HeaderV2';
import InformacionDePadron from '../../components/InformacionDePadron';
import { RootStackParamList } from '../../types/navigation';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'busquedaPadron'>;

type ResumenDePagoScreenProps = NavigationProps;

/**
 * Pantalla de resumen de pago empleada
 * en pagos diversos.
 *
 * En esta pantalla el usuario puede ver
 * la información de su padron y los cargos
 * generados para así poder imprimir su
 * orden de pago.
 */
const ResumenDePagoScreen = ({ navigation }: ResumenDePagoScreenProps) => (
  <>
    <Header
      title="Pagos Diversos"
    />

    <ScrollView contentContainerStyle={styles.content}>
      <SafeAreaView>

        <InformacionDePadron
          tipoDePadron="Ciudadano"
          nombre="John Doe"
          clave="CI-22-000021"
        />

        <ConceptosDePago
          style={styles.item}
        />

        <Button
          text="Pagar en linea"
          iconName="arrow-circle-right"
          style={styles.item}
        />

        <Button
          text="Generar orden de pago"
          iconName="download"
          style={styles.item}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{
              name: 'menuInicio',
            }],
          })}
        />
      </SafeAreaView>
    </ScrollView>

  </>
);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 20,
  },
  item: {
    marginTop: 18,
  },
});

export default ResumenDePagoScreen;
