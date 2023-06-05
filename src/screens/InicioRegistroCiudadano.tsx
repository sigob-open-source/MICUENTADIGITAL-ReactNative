/* eslint-disable @typescript-eslint/no-non-null-assertion */
// External dependencies
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import HeaderV2 from '../components/HeaderV2';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import LadaModalPicker from '../components/LadaPicker';
import ladas from '../dataset/ladas.json';
import { solicitarCodigoDeAcceso } from '../services/cuentaunicasir/auth';
import { RootStackParamList } from '../types/navigation';
import { useNotification } from '../components/DropDownAlertProvider';

// Types & Interfaces
interface FormValues {
  countryCode: string;
  phoneNumber: string;
}

type IInicioRegistroCiudadanoScreenProps = NativeStackScreenProps<RootStackParamList, 'registroCiudadano'>;

// Constants
const FORM_SCHEMA = yup.object({
  countryCode: yup
    .string()
    .typeError('Campo no valido'),
  phoneNumber: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido')
    .matches(/[0-9]{10}/, 'Ingrese un número válido'),
});

const InicioRegistroCiudadanoScreen = ({
  navigation,
  route: {
    params,
  },
}: IInicioRegistroCiudadanoScreenProps) => {
  // Component's state
  const [showCodePicker, setShowCodePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Misc
  const notify = useNotification();

  const formik = useFormik<FormValues>({
    initialValues: {
      countryCode: params?.lada || '52',
      phoneNumber: params?.numeroDeTelefono || '',
    },
    validationSchema: FORM_SCHEMA,
    validateOnChange: true,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);
      const ladaId = ladas.find((x) => x.lada === values.countryCode)!.id;
      const numeroDeTelefono = parseInt(values.phoneNumber, 10);

      const { success, errors } = await solicitarCodigoDeAcceso({
        lada: ladaId,
        numero_de_celular: numeroDeTelefono,
      });

      setLoading(false);
      if (success) {
        navigation.navigate('codigoScreen');
        return;
      }

      if (errors?.fields) {
        formikHelpers.setFieldError('countryCode', errors.fields.lada);
        formikHelpers.setFieldError('phoneNumber', errors.fields.numero_de_celular);
      } else {
        notify({
          message: 'No se encontró el número, favor de registrarse',
          title: 'Número no registrado',
          type: 'info',
        });
      }
    },
  });

  return (
    <>
      <HeaderV2
        title="Iniciar sesión"
      />

      <View style={styles.container}>
        <Card style={{ padding: 15 }}>
          <TouchableWithoutFeedback
            onPress={() => setShowCodePicker(true)}
          >
            <View style={{ marginVertical: 8 }}>
              <Text style={styles.countryCodeLabel}>
                Lada:
              </Text>
              <View
                style={[
                  styles.countryCodeContainer,
                ]}
              >
                <Text
                  style={[
                    styles.countryCode,
                    { color: formik.values.countryCode ? '#010101' : '#cccccc' },
                  ]}
                  numberOfLines={1}
                >
                  {
                        formik.values.countryCode || 'Ingresa tu clave larga distancia automática'
                      }
                </Text>

                <Icon name="angle-down" size={25} color="#010101" />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <Input
            value={formik.values.phoneNumber}
            onChangeText={(value) => formik.setFieldValue('phoneNumber', value)}
            label="Número de teléfono"
            keyboardType="phone-pad"
            placeholder="Ingresa tu número de teléfono"
            placeholderTextColor="#cccccc"
            error={formik.errors.phoneNumber}
          />
        </Card>

        <Button
          loading={loading}
          style={styles.cta}
          size="large"
          text="Iniciar sesión"
          onPress={formik.handleSubmit}
        />

        <Button
          disabled={loading}
          style={styles.cta}
          size="large"
          text="Registrarse"
          onPress={() => navigation.navigate('registroScreen')}
        />
      </View>

      <LadaModalPicker
        visible={showCodePicker}
        onClose={() => setShowCodePicker(false)}
        onSelect={(lada) => formik.setFieldValue('countryCode', lada.lada)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  countryCodeContainer: {
    height: 37,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
  },
  countryCodeLabel: {
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '600',
    marginBottom: 4,
  },
  countryCode: {
    color: '#000',
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  container: {
    padding: 20,
  },
  cta: {
    marginTop: 20,
  },
});

export default InicioRegistroCiudadanoScreen;
