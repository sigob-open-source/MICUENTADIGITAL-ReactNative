// External dependencies
import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import { useDispatch } from 'react-redux';
import Card from '../../components/Card';
import Header, { IconButton } from '../../components/HeaderV2';
import { RootStackParamList } from '../../types/navigation';
import { getPadrones } from '../../services/catalogos/padrones';
import { PadronProps } from '../../services/catalogos/padrones.types';
import { setTipoDePadron } from '../../store-v2/reducers/pagos-diversos';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'seleccionarTipoDePadron'>;

type SeleccionarTipoDePadronScreenProps = NavigationProps;

// Constants
const ALLOWED_PADRONES_REGEXP = /ciudadano|empresa|contribuyente/i;

const SeleccionarTipoDePadronScreen = ({ navigation }: SeleccionarTipoDePadronScreenProps) => {
  // Component's state
  const [padrones, setPadrones] = useState<PadronProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getPadrones()
      .then(setPadrones)
      .finally(() => setLoading(false));
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    const data = await getPadrones();
    setPadrones(data);
    setRefreshing(false);
  };

  const filteredPadrones = useMemo(() => padrones
    .filter((x) => ALLOWED_PADRONES_REGEXP.test(x.descripcion)), [padrones]);

  const selectPadron = (index: number) => {
    const tipoDePadron = filteredPadrones[index];

    if (tipoDePadron) {
      dispatch(setTipoDePadron(tipoDePadron));
      navigation.navigate('busquedaPadron');
    }
  };

  return (
    <>
      <Header
        title="Pagos Diversos"
        leftComponent={<IconButton name="angle-left" onPress={() => navigation.goBack()} />}
      />

      <Text style={styles.title}>Seleccione tipo de padrón:</Text>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      >
        <SafeAreaView>
          {loading && <ActivityIndicator size="large" />}

          {
            !loading && filteredPadrones.length === 0 && (
              <Text style={styles.noResults}>
                Sin Resultados
              </Text>
            )
          }

          {
            filteredPadrones.map((padron, idx) => (
              <TouchableWithoutFeedback
                onPress={() => selectPadron(idx)}
                key={padron.id}
              >
                <View>
                  <Card
                    key={padron.id}
                    style={{ marginBottom: idx === filteredPadrones.length - 1 ? 0 : 8 }}
                  >
                    <Text style={styles.padron}>
                      {padron.descripcion}
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
  noResults: {
    fontSize: 18,
    fontWeight: '500',
    color: '#9F9F9F',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default SeleccionarTipoDePadronScreen;
