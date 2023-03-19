// External dependencies
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header, { IconButton } from '../../components/HeaderV2';
import Input from '../../components/Input';
import { RootStackParamList } from '../../types/navigation';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'busquedaPadron'>;

type BuscarPadronScreenProps = NavigationProps;

interface FormFields {
  predioIdentifier: string;
}

// Constants
const FORM_SCHEMA = yup.object({
  predioIdentifier: yup
    .string()
    .typeError('Campo no válido')
    .trim()
    .required('El campo es requerido'),
});

/**
 * Pantalla de busqueda de padrón empleada
 * en el primer paso de pagos diversos.
 */
const BuscarPadronScreen = ({ navigation }: BuscarPadronScreenProps) => {
  const formik = useFormik<FormFields>({
    initialValues: {
      predioIdentifier: '',
    },
    validationSchema: FORM_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
      navigation.navigate('confirmarPadron');
    },
  });

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
            label="Clave, RFC o CURP"
            value={formik.values.predioIdentifier}
            onChangeText={(val) => formik.setFieldValue('predioIdentifier', val)}
            error={formik.errors.predioIdentifier}
            placeholder="Buscar padrón"
            placeholderTextColor="#cccccc"
          />

          <Button
            onPress={formik.submitForm}
            style={styles.cta}
            text="Buscar"
            iconName="search"
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
