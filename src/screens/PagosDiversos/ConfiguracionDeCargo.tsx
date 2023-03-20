// External dependencies
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import { View, StyleSheet } from 'react-native';
import * as yup from 'yup';

// Internal dependencies
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header, { IconButton } from '../../components/HeaderV2';
import Input from '../../components/Input';
import { RootStackParamList } from '../../types/navigation';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'configuracionDeCargo'>;

type ConfiguracionDeCargoScreenProps = NavigationProps;

interface FormValues {
  cantidad: string;
  ingresos: string;
}

// Constants
const transformToNumber = (value: string) => {
  const number = parseFloat(value);
  return number;
};

const greatherThan = (value: string, min: number) => transformToNumber(value) > min;

const FORM_SCHEMA = yup.object({
  cantidad: yup
    .string()
    .typeError('Campo no válido')
    .required('El campo es requerido')
    .matches(/^[0-9]{1,}/g, 'Campo no válido')
    .test('min_value', 'Ingrese un número mayor a 1', (value) => greatherThan(value, 0)),
  ingresos: yup
    .string()
    .typeError('Campo no válido')
    .required('El campo es requerido')
    .matches(/^[0-9]{1,}/g, 'Campo no válido')
    .test('min_value', 'Ingrese un número mayor a 1', (value) => greatherThan(value, 0)),
});

/**
 * Pantalla de configuración de cargo empleada
 * en el flujo de pagos diversos.
 *
 * El usuario después de seleccionar un cargo,
 * será enviado a esta pantalla donde se le pedirá
 * llenar todas las variables que el cargo requiera.
 */
const ConfiguracionDeCargoScreen = ({ navigation }: ConfiguracionDeCargoScreenProps) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      ingresos: '',
      cantidad: '1',
    },
    validationSchema: FORM_SCHEMA,
    onSubmit(values) {
      const normalizedValues = {
        cantidad: transformToNumber(values.cantidad),
        ingresos: transformToNumber(values.ingresos),
      };

      console.log(normalizedValues);

      navigation.navigate('busquedaDeCargos');
    },
  });

  const goBack = () => {};

  return (
    <>
      <Header
        leftComponent={<IconButton name="angle-left" onPress={goBack} />}
      />

      <View style={styles.content}>
        <Card>
          <Input
            style={styles.formItem}
            label="Ingresos obtenidos"
            keyboardType="numeric"
            value={formik.values.ingresos}
            onChangeText={(value) => formik.setFieldValue('ingresos', value)}
            error={formik.errors.ingresos}
          />

          <Input
            label="Cantidad"
            textInputStyle={styles.quantityInput}
            disabled
            keyboardType="numeric"
            value={formik.values.cantidad}
            onChangeText={(value) => formik.setFieldValue('cantidad', value)}
            error={formik.errors.cantidad}
          />
        </Card>

        <Button
          text="Añadir"
          style={styles.cta}
          onPress={formik.submitForm}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  formItem: {
    marginBottom: 8,
  },
  quantityInput: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  cta: {
    marginTop: 21,
  },
});

export default ConfiguracionDeCargoScreen;
