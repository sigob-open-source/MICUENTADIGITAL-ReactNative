// External dependencies
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import Card from '../../components/Card';
import Header, { IconButton } from '../../components/HeaderV2';
import { RootStackParamList } from '../../types/navigation';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'seleccionarTipoDePadron'>;

type SeleccionarTipoDePadronScreenProps = NavigationProps;

// Constants
const padronesMocks = [
  {
    id: 1,
    name: 'Ciudadano',
  },
  {
    id: 2,
    name: 'Empresa',
  },
  {
    id: 3,
    name: 'Contribuyente',
  },
];

const SeleccionarTipoDePadronScreen = ({ navigation }: SeleccionarTipoDePadronScreenProps) => {
  '';

  return (
    <>
      <Header
        title="Pagos Diversos"
        leftComponent={<IconButton name="angle-left" onPress={() => navigation.goBack()} />}
      />

      <Text style={styles.title}>Seleccione tipo de padrón:</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <SafeAreaView>
          {
            padronesMocks.map((padron, idx) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('busquedaPadron')}
                key={padron.id}
              >
                <View>
                  <Card
                    key={padron.id}
                    style={{ marginBottom: idx === padronesMocks.length - 1 ? 0 : 8 }}
                  >
                    <Text style={styles.padron}>
                      {padron.name}
                    </Text>
                  </Card>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#010101',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  padron: {
    fontSize: 18,
    fontWeight: '500',
    color: '#010101',
    textTransform: 'uppercase',
  },
});

export default SeleccionarTipoDePadronScreen;
