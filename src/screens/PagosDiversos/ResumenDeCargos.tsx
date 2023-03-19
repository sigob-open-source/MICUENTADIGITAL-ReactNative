// External dependencies
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Internal dependencies
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header, { IconButton } from '../../components/HeaderV2';
import Separator from '../../components/Separator';
import { RootStackParamList } from '../../types/navigation';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'busquedaPadron'>;

type ResumenDeCargosScreenProps = NavigationProps;

const cargosMock = Array.from({ length: 5 }).map((_, idx) => ({
  id: idx,
  clave: '09011101001-01',
  name: 'PELEAS DE GALLOS Y CORRIDAS DE TOROS',
  variables: [{
    id: `Ingresos obtenidos${idx}`,
    name: 'Ingresos obtenidos',
    value: '10,000',
  }],
  importe: null,
}));

const ResumenDeCargosScreen = ({ navigation }: ResumenDeCargosScreenProps) => (
  <>
    <Header
      title="Pagos Diversos"
      leftComponent={<IconButton name="angle-left" onPress={() => navigation.goBack()} />}
    />

    <ScrollView contentContainerStyle={styles.content}>
      {
        cargosMock.map((item, idx) => (
          <Card key={item.id} style={{ marginBottom: idx === cargosMock.length - 1 ? 0 : 8 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.name}</Text>

              <TouchableWithoutFeedback onPress={() => {}}>
                <View>
                  <Icon name="trash-alt" color="#F98888" size={15} />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <Separator gap={11} />

            {
              item.variables.map((variable) => (
                <React.Fragment key={variable.id}>
                  <Text style={styles.field}>
                    { variable.name }
                  </Text>
                  <Text style={styles.value}>
                    { variable.value }
                  </Text>
                </React.Fragment>
              ))
            }

            <Text style={styles.field}>
              Clave
            </Text>
            <Text style={styles.value}>
              {item.clave}
            </Text>

            <Text style={styles.field}>
              Importe
            </Text>
            <Text style={styles.value}>
              {item.importe ? item.importe : 'Por calcular'}
            </Text>
          </Card>
        ))
      }
    </ScrollView>

    <View style={styles.bottomContainer}>
      <SafeAreaView>
        <View style={styles.bottomInnerContainer}>
          <Button
            text="Generar Cargos"
            onPress={() => navigation.navigate('resumenDePago')}
          />
        </View>
      </SafeAreaView>
    </View>
  </>
);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#535353',
    fontSize: 10,
    fontWeight: '600',
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
  bottomContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#cccc',
  },
  bottomInnerContainer: {
    padding: 20,
  },
});

export default ResumenDeCargosScreen;
