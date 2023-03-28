// External dependencies
import React, { useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import { View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

// Internal dependencies
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header, { IconButton } from '../../components/HeaderV2';
import Input from '../../components/Input';
import { RootStackParamList } from '../../types/navigation';
import { useAppSelector } from '../../store-v2/hooks';
import { setCart } from '../../store-v2/reducers/pagos-diversos';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'configuracionDeCargo'>;

type ConfiguracionDeCargoScreenProps = NavigationProps;

// Constants
const VARIABLE_KIND = Object.freeze({
  DATE_RANGE: '3',
  DECIMAL: '2',
  INTEGER: '1',
});

/**
 * Pantalla de configuración de cargo empleada
 * en el flujo de pagos diversos.
 *
 * El usuario después de seleccionar un cargo,
 * será enviado a esta pantalla donde se le pedirá
 * llenar todas las variables que el cargo requiera.
 */
const ConfiguracionDeCargoScreen = ({
  navigation,
  route: { params: { tipoDeCargo } },
}: ConfiguracionDeCargoScreenProps) => {
  const cart = useAppSelector((state) => state.pagosDiversos.cart);
  const dispatch = useDispatch();
  const variables = useMemo(() => tipoDeCargo.variables ?? [], [tipoDeCargo]);

  // Si el tipo de cargo ya está configurado en el store (cart), traemos los valores anteriores
  const variablesPrevValues = useMemo(() => {
    const item = cart.find((x) => x.tipoDeCargo.id === tipoDeCargo.id);

    if (item) {
      return item.variables.reduce((obj, variable) => {
        // eslint-disable-next-line no-param-reassign
        obj[variable.nombre_de_variable] = variable.value;
        return obj;
      }, {} as Record<string, string>);
    }

    return {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const initialValues = useMemo(() => {
    const output = {
      cantidad: '1',
    } as Record<string, string>;

    variables.forEach((variable) => {
      output[variable.nombre_de_variable] = variablesPrevValues[
        variable.nombre_de_variable
      ] ?? null;
    });

    return output;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);

  const schema = useMemo(() => {
    const dynamicSchema = variables.reduce((obj, variable) => {
      const isNumeric = [
        VARIABLE_KIND.INTEGER,
        VARIABLE_KIND.DECIMAL,
      ].includes(variable.tipo_de_variable.clave);

      if (isNumeric) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line
        obj[variable.nombre_de_variable] = yup
          .number()
          .required('El campo es requerido')
          .typeError('Campo no válido')
          .test('optional_min', `El valor mínimo es ${tipoDeCargo.importe_minimo}`, (value) => {
            if (typeof tipoDeCargo.importe_maximo !== 'number') return true;

            return value >= tipoDeCargo.importe_minimo;
          })
          .test('optional_max', `El valor máximo es ${tipoDeCargo.importe_maximo}`, (value) => {
            if (typeof tipoDeCargo.importe_maximo !== 'number') return true;

            return value <= tipoDeCargo.importe_maximo;
          })
          .test('decimal_not_allowed', 'Ingrese un valor entero', (value) => {
            if (variable.tipo_de_variable.clave !== VARIABLE_KIND.INTEGER) return true;

            return !value.toString().includes('.');
          });
      }

      return obj;
    }, {});

    return yup.object({
      ...dynamicSchema,
      cantidad: yup
        .number()
        .required('El campo es requerido')
        .typeError('Campo no válido')
        .min(1, 'El valor debe ser mayor a 0')
        .max(50, 'El valor máximo es 50'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit(values) {
      const newCart = [...cart];
      const variablesWithValues = variables.map((x) => (
        {
          ...x,
          value: values[x.nombre_de_variable],
        }
      ));
      const cantidad = parseInt(values.cantidad, 10);

      // Revisar si la configuración del cargo ya está disponible en el cart
      // y de ser el caso actualizar en lugar de añadir.
      const cartItemIndex = cart.findIndex((x) => x.tipoDeCargo.id === tipoDeCargo.id);

      if (cartItemIndex !== -1) {
        newCart[cartItemIndex].variables = variablesWithValues;
        newCart[cartItemIndex].cantidad = cantidad;
      } else {
        newCart.push({
          tipoDeCargo,
          variables: variablesWithValues,
          cantidad,
        });
      }

      dispatch(setCart(newCart));
      navigation.goBack();
    },
  });

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header
        leftComponent={<IconButton name="angle-left" onPress={goBack} />}
      />

      <View style={styles.content}>
        <Card>
          {
            variables.map((variable) => (
              <Input
                key={variable.nombre_de_variable}
                style={styles.formItem}
                label={variable.descripcion_de_variable}
                keyboardType={[VARIABLE_KIND.DECIMAL, VARIABLE_KIND.INTEGER].includes(variable.tipo_de_variable.clave) ? 'numeric' : 'default'}
                value={formik.values[variable.nombre_de_variable]}
                onChangeText={(value) => formik.setFieldValue(variable.nombre_de_variable, value)}
                error={formik.errors[variable.nombre_de_variable]}
                placeholder="Ingresar valor"
              />
            ))
          }

          <Input
            label="Cantidad"
            textInputStyle={styles.quantityInput}
            disabled
            keyboardType="numeric"
            value={formik.values.cantidad}
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
