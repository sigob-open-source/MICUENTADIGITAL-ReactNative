// External dependencies
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Cart from '../../../components/Cart';
import Cargo from './Cargo';
import { RootStackParamList } from '../../../types/navigation';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'busquedaPadron'>;

type BusquedaDeCargosScreenProps = NavigationProps;

// Constants
const CARGOS = Array.from({ length: 20 }).map((v, idx) => ({
  id: idx,
  name: `PELEAS DE GALLOS Y CORRIDAS DE TOROS ${idx + 1}`,
}));

const BusquedaDeCargosScreen = ({ navigation }: BusquedaDeCargosScreenProps) => {
  const [search, setSearch] = useState<string>('');
  const [addedItems] = useState<Record<number, true | false | undefined>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const filteredItems = useMemo(() => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) return CARGOS;

    const regexp = new RegExp(trimmedSearch, 'ig');

    return CARGOS.filter((x) => regexp.test(x.name));
  }, [search]);

  const addCargo = () => {
    navigation.navigate('configuracionDeCargo');
  };

  const addedItemsCount = useMemo(() => CARGOS
    .reduce((prev, curr, idx) => prev + (addedItems[idx] ? 1 : 0), 0), [addedItems]);

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
              value={search}
              onChangeText={setSearch}
            />

            <TouchableWithoutFeedback onPress={() => navigation.navigate('resumenDeCargos')}>
              <View>
                <Cart items={addedItemsCount} style={styles.cart} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredItems.map((item, idx) => (
          <View
            key={item.id}
            style={styles.cargo}
          >
            <Cargo
              onPress={() => addCargo()}
              name={item.name}
              added={Boolean(addedItems[idx])}
            />
          </View>
        ))}

        {filteredItems.length === 0 && (
          <Text style={styles.noResults}>
            Sin resultados
          </Text>
        )}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <SafeAreaView>
          <View style={styles.bottomInnerContainer}>
            <Button
              text="Continuar"
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
  },
});

export default BusquedaDeCargosScreen;
