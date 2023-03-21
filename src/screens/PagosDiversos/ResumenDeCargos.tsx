// External dependencies
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';

// Internal dependencies
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header, { IconButton } from '../../components/HeaderV2';
import Separator from '../../components/Separator';
import { RootStackParamList } from '../../types/navigation';
import { useAppSelector } from '../../store-v2/hooks';
import { setCargos, setCart } from '../../store-v2/reducers/pagos-diversos';
import { generarCargosPublicosConCanalDePago } from '../../services/recaudacion/generar-cargos';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'busquedaPadron'>;

type ResumenDeCargosScreenProps = NavigationProps;

const ResumenDeCargosScreen = ({ navigation }: ResumenDeCargosScreenProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tipoDePadron = useAppSelector((state) => state.pagosDiversos.tipoDePadron)!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const padron = useAppSelector((state) => state.pagosDiversos.padron)!;
  const cart = useAppSelector((state) => state.pagosDiversos.cart);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const removeItem = (index: number) => {
    // TODO: Add confirmation before delete item.
    const newCart = cart.filter((item, idx) => idx !== index);

    dispatch(setCart(newCart));
  };

  const ctaHandler = async () => {
    if (cart.length === 0) {
      navigation.goBack();
    }

    setLoading(true);

    // Generar cargos
    const cargosPayloads = cart.map((item) => ({
      canal_de_pago: 4,
      entidad: 1,
      padron: tipoDePadron.id,
      padron_id: padron.id,
      tipo_de_cargo: item.tipoDeCargo.id,
      variables: item.variables.map((v) => ({
        variable_id: v.id,
        nombre_de_variable: v.nombre_de_variable,
        valor: v.value,
      })),
    }));

    const cargosReponse = await Promise.all(
      cargosPayloads.map((payload) => generarCargosPublicosConCanalDePago(payload)),
    );

    const succesResponses = cargosReponse.filter((x) => x !== null);
    dispatch(setCargos(succesResponses));
    setLoading(false);
    navigation.navigate('resumenDePago');
  };

  return (
    <>
      <Header
        title="Pagos Diversos"
        leftComponent={<IconButton name="angle-left" onPress={() => navigation.goBack()} />}
      />

      <FlatList
        contentContainerStyle={styles.content}
        data={cart}
        keyExtractor={(data) => data.tipoDeCargo.id.toString()}
        renderItem={({ item, index }) => (
          <Card key={item.tipoDeCargo.id}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.tipoDeCargo.descripcion}</Text>

              <TouchableWithoutFeedback onPress={() => removeItem(index)}>
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
                    { variable.descripcion_de_variable }
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
              {item.tipoDeCargo.clave}
            </Text>

            <Text style={styles.field}>
              Importe
            </Text>
            <Text style={styles.value}>
              {item.tipoDeCargo.importe_total ? item.tipoDeCargo.importe_total : 'Por calcular'}
            </Text>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
              width: '100%',
            }}
          >
            <Text style={styles.emptyText}>Sin elementos</Text>
          </View>
        )}
      />

      <View style={styles.bottomContainer}>
        <SafeAreaView>
          <View style={styles.bottomInnerContainer}>
            <Button
              disabled={cart.length === 0}
              text="Generar Cargos"
              onPress={ctaHandler}
              loading={loading}
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

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
  emptyText: {
    fontSize: 16,
    color: '#010101',
    fontWeight: '500',
  },
});

export default ResumenDeCargosScreen;
