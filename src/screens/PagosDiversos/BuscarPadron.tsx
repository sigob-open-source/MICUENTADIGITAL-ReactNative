// External dependencies
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

// Internal dependencies
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header, { IconButton } from '../../components/HeaderV2';
import Input from '../../components/Input';
import { RootStackParamList } from '../../types/navigation';
import { useAppSelector } from '../../store-v2/hooks';
import { PADRONES_PAGOS_DIVERSOS } from '../../utils/constants';
import { getCiudadanoCaja } from '../../services/cuentaunicasir/ciudadano';
import { getContribuyenteCaja } from '../../services/empresas/contribuyentes-caja-public';
import { getEmpresaCaja } from '../../services/cuentaunicasir/empresa';
import { setPadron } from '../../store-v2/reducers/pagos-diversos';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'busquedaPadron'>;

type BuscarPadronScreenProps = NavigationProps;

interface FormFields {
  padronIdentifier: string;
}

// Constants
const FORM_SCHEMA = yup.object({
  padronIdentifier: yup
    .string()
    .typeError('Campo no válido')
    .trim()
    .required('El campo es requerido'),
});

const LABELS: Record<number, string> = Object.freeze({
  [PADRONES_PAGOS_DIVERSOS.CIUDADANO]: 'Clave, RFC o CURP',
  [PADRONES_PAGOS_DIVERSOS.EMPRESA]: 'Clave',
  [PADRONES_PAGOS_DIVERSOS.CONTRIBUYENTE]: 'Clave, RFC o CURP',
});

/**
 * Pantalla de busqueda de padrón empleada
 * en el primer paso de pagos diversos.
 */
const BuscarPadronScreen = ({ navigation }: BuscarPadronScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const tipoDePadron = useAppSelector((state) => state.pagosDiversos.tipoDePadron);
  const dispatch = useDispatch();

  const label = tipoDePadron ? LABELS[tipoDePadron.id] : LABELS[PADRONES_PAGOS_DIVERSOS.EMPRESA];
  const placeholder = tipoDePadron ? `Buscar padrón (${tipoDePadron.descripcion})` : 'Buscar padrón';

  const formik = useFormik<FormFields>({
    initialValues: {
      padronIdentifier: '',
    },
    validationSchema: FORM_SCHEMA,
    onSubmit: (values) => {
      void searchPadron(values.padronIdentifier);
    },
  });

  const getSearchEndpoint = () => {
    let endpoint;

    switch (tipoDePadron?.id) {
      case PADRONES_PAGOS_DIVERSOS.CIUDADANO:
        endpoint = getCiudadanoCaja;
        break;
      case PADRONES_PAGOS_DIVERSOS.EMPRESA:
        endpoint = getEmpresaCaja;
        break;
      case PADRONES_PAGOS_DIVERSOS.CONTRIBUYENTE:
        endpoint = getContribuyenteCaja;
        break;
      default:
        break;
    }

    return endpoint;
  };

  const searchPadron = async (search: string) => {
    setLoading(true);
    const endpoint = getSearchEndpoint();

    if (!endpoint) {
      // Si el endpoint no se encontró quiere decir
      // que el padrón aún no está soportado por el
      // flujo de la aplicación, así que regresamos
      // al usuario a selecionar otro tipo de padrón.
      setLoading(false);
      navigation.goBack();
      return;
    }

    const response = await endpoint({ entidad: 1, q: search });
    if (!response) {
      formik.setFieldError('padronIdentifier', 'No se encontró el padrón');
      setLoading(false);
      return;
    }

    // Guardar padrón y revisar si tiene información de contacto

    setLoading(false);
    dispatch(setPadron(response));
    navigation.navigate('confirmarPadron');
  };

  return (
    <>
      <Header
        leftComponent={<IconButton name="angle-left" onPress={() => navigation.goBack()} />}
        title="Pagos Diversos"
      />

      <View style={styles.container}>

        <Card style={styles.card}>
          <Input
            style={styles.input}
            label={label}
            value={formik.values.padronIdentifier}
            onChangeText={(val) => formik.setFieldValue('padronIdentifier', val)}
            error={formik.errors.padronIdentifier}
            placeholder={placeholder}
            placeholderTextColor="#cccccc"
            disabled={loading}
            autoCapitalize="characters"
          />

          <Button
            onPress={formik.submitForm}
            style={styles.cta}
            text="Buscar"
            iconName="search"
            loading={loading}
          />
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  cta: {
    marginTop: 13,
  },
});

export default BuscarPadronScreen;
