// External dependencies
import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Cart from '../../../components/Cart';
import Cargo from './Cargo';
import { RootStackParamList } from '../../../types/navigation';
import { getTiposDeCargo } from '../../../services/recaudacion/tipos-de-cargos';
import { useAppSelector } from '../../../store-v2/hooks';
import { TipoDeCargo } from '../../../services/recaudacion/tipos-de-cargos.types';
import useDebouncedValue from '../../../hooks/useDebouncedValue';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'busquedaPadron'>;

type BusquedaDeCargosScreenProps = NavigationProps;

// Constants
const COMMON_PARAMS = Object.freeze({
  entidad: 1,
  canales_de_pago: 4,
  tipo_de_aplicacion: [2, 4, 5, 6],
  es_accesorio: false,
  clasificador_de_tipo_de_cargo_en_portal: 2,
  identificadores: 3,
});

const BusquedaDeCargosScreen = ({ navigation }: BusquedaDeCargosScreenProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tipoDePadron = useAppSelector((state) => state.pagosDiversos.tipoDePadron)!;
  const cart = useAppSelector((state) => state.pagosDiversos.cart);
  const [page, setPage] = useState<number>(1);
  const [rawSearch, setRawSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [tiposDeCargos, setTiposDeCargos] = useState<TipoDeCargo[]>([]);

  const descripcion = useDebouncedValue(rawSearch, 500);

  const addCargo = (tipoDeCargo: TipoDeCargo) => {
    navigation.navigate('configuracionDeCargo', {
      tipoDeCargo,
    });
  };

  const addedItems = useMemo(() => cart.reduce((obj, item) => {
    // eslint-disable-next-line no-param-reassign
    obj[item.tipoDeCargo.id] = true;
    return obj;
  }, {} as Record<number, boolean>), [cart]);

  const getRequestParams = (currentPage: number = page) => {
    const params = {
      ...COMMON_PARAMS,
      padron: tipoDePadron.id,
      page: currentPage,
    } as Record<string, unknown>;

    if (descripcion) {
      params.descripcion = descripcion;
    }

    return params;
  };

  useEffect(() => {
    if (tipoDePadron.id) {
      const curretPage = 1;
      setPage(curretPage);
      setLoading(true);

      void getTiposDeCargo(getRequestParams(curretPage))
        .then((data) => setTiposDeCargos(data))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoDePadron.id, descripcion]);

  const appendCargos = (items: TipoDeCargo[]) => {
    const seenIds = new Set<TipoDeCargo['id']>();

    setTiposDeCargos([
      ...tiposDeCargos,
      ...items,
    ].filter((x) => {
      if (seenIds.has(x.id)) {
        return false;
      }
      seenIds.add(x.id);
      return true;
    }));
  };

  const refreshHandler = async () => {
    setRefreshing(true);

    const response = await getTiposDeCargo(getRequestParams());

    appendCargos(response);

    setRefreshing(false);
  };

  const fetchNextPage = async () => {
    setLoading(true);
    const nextPage = page + 1;

    const response = await getTiposDeCargo(getRequestParams(nextPage));

    if (response.length) {
      setPage(nextPage);
    }

    appendCargos(response);
    setLoading(false);
  };

  return (
    <>
      <View style={styles.searchHeaderOuterContainer}>
        <SafeAreaView>
          <View style={styles.searchHeaderInnerContainer}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View style={styles.headerButton}>
                <Icon name="angle-left" size={25} color="#010101" />
              </View>
            </TouchableWithoutFeedback>

            <Input
              placeholder="Búsqueda por descripción"
              placeholderTextColor="#9E9E9E"
              leftIcon={<Icon name="search" size={18} color="#010101" />}
              style={styles.headerInput}
              value={rawSearch}
              onChangeText={(v) => setRawSearch(v.trim())}
            />

            <TouchableWithoutFeedback onPress={() => navigation.navigate('resumenDeCargos')}>
              <View>
                <Cart items={cart.length} style={styles.cart} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </View>

      <FlatList
        refreshing={refreshing}
        onRefresh={refreshHandler}
        contentContainerStyle={styles.content}
        data={tiposDeCargos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={styles.cargo}
          >
            <Cargo
              onPress={() => addCargo(item)}
              name={item.descripcion}
              total={item.importe_total}
              added={Boolean(addedItems[item.id])}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noResults}>
            {loading ? 'Cargando' : 'Sin resultados'}
          </Text>
        )}
        onEndReached={fetchNextPage}
      />

      <View style={styles.bottomContainer}>
        <SafeAreaView>
          <View style={styles.bottomInnerContainer}>
            <Button
              disabled={cart.length === 0}
              text={cart.length > 0 ? 'Continuar' : 'Sin elementos'}
              onPress={() => navigation.navigate('resumenDeCargos')}
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchHeaderOuterContainer: {
    backgroundColor: 'white',
  },
  searchHeaderInnerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccc',
  },
  headerButton: {
    aspectRatio: 1,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInput: {
    flex: 1,
    marginLeft: 25,
  },
  cart: {
    marginLeft: 17,
  },
  bottomContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#cccc',
  },
  bottomInnerContainer: {
    padding: 20,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  cargo: {
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  noResults: {
    fontSize: 18,
    fontWeight: '500',
    color: '#010101',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default BusquedaDeCargosScreen;
