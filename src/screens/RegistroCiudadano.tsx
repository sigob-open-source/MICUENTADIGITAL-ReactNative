/* eslint-disable @typescript-eslint/no-non-null-assertion */
// External dependencies
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import HeaderV2 from '../components/HeaderV2';
import Card from '../components/Card';
import Input from '../components/Input';
import ladas from '../dataset/ladas.json';
import LadaModalPicker from '../components/LadaPicker';
import Button from '../components/Button';
import { RootStackParamList } from '../types/navigation';
import { createCiudadano } from '../services/cuentaunicasir/ciudadano';
import { solicitarCodigoDeAcceso } from '../services/cuentaunicasir/auth';
import { useNotification } from '../components/DropDownAlertProvider';

// Types & Interfaces
type TRegistroCiudadanoScreenProps = NativeStackScreenProps<RootStackParamList, 'registroScreen'>;

interface FormValues {
  curp: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  lada: string;
  numeroDeTelefono: string;
  correoElectronico: string;
}

const FORM_SCHEMA = yup.object({
  curp: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido')
    .matches(/^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9]{2}$/, 'Campo no valido'),
  nombre: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido'),
  apellidoPaterno: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido'),
  apellidoMaterno: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido'),
  lada: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido'),
  numeroDeTelefono: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido')
    .matches(/[0-9]{10}/, 'Ingrese un número válido'),
  correoElectronico: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Ingrese un correo válido'),
});

const PLACEHOLDER_TEXT_COLOR = '#a0a0a0';

const RegistroCiudadanoScreen = ({ navigation }: TRegistroCiudadanoScreenProps) => {
  // State
  const [showCodePicker, setShowCodePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const notify = useNotification();

  const formik = useFormik<FormValues>({
    initialValues: {
      curp: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      lada: '52',
      numeroDeTelefono: '',
      correoElectronico: '',
    },
    validationSchema: FORM_SCHEMA,
    validateOnChange: true,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);
      const ladaId = ladas.find((x) => x.lada === values.lada)!.id;
      const numeroDeTelefono = parseInt(values.numeroDeTelefono, 10);

      const { success, errors } = await createCiudadano({
        apellido_materno: values.apellidoMaterno,
        apellido_paterno: values.apellidoPaterno,
        email: values.correoElectronico,
        CURP: values.curp,
        lada: ladaId,
        nombre: values.nombre,
        numero_de_celular: numeroDeTelefono,
        entidad: [1],
      }, { entidad: 1 });

      if (success) {
        const { success: codeSent } = await solicitarCodigoDeAcceso({
          lada: ladaId,
          numero_de_celular: numeroDeTelefono,
        });

        setLoading(false);
        if (codeSent) {
          navigation.reset({
            index: 2,
            routes: [
              {
                name: 'loginScreen',
              },
              {
                name: 'registroCiudadano',
                params: {
                  lada: values.lada,
                  numeroDeTelefono: values.numeroDeTelefono,
                },
              },
              {
                name: 'codigoScreen',
              },
            ],
          });
        } else {
          navigation.reset({
            index: 1,
            routes: [
              {
                name: 'loginScreen',
              },
              {
                name: 'registroCiudadano',
                params: {
                  lada: values.lada,
                  numeroDeTelefono: values.numeroDeTelefono,
                },
              },
            ],
          });
        }

        return;
      }

      setLoading(false);
      if (errors && errors.fields) {
        formikHelpers.setFieldError('curp', errors.fields.CURP);
        formikHelpers.setFieldError('nombre', errors.fields.nombre);
        formikHelpers.setFieldError('apellidoPaterno', errors.fields.apellido_paterno);
        formikHelpers.setFieldError('apellidoMaterno', errors.fields.apellido_materno);
        formikHelpers.setFieldError('lada', errors.fields.lada);
        formikHelpers.setFieldError('numeroDeTelefono', errors.fields.numero_de_celular);
        formikHelpers.setFieldError('correoElectronico', errors.fields.email);

        return;
      }

      notify({
        type: 'error',
        title: 'Error',
        message: 'Algo salió mal, intente más tarde',
      });
    },
  });

  return (
    <>

      <HeaderV2
        title="Registro"
      />

      <KeyboardAwareScrollView contentContainerStyle={{ padding: 20 }}>
        <Card style={{ padding: 15 }}>
          <Input
            label="CURP"
            placeholder="Ingrese su CURP"
            value={formik.values.curp}
            onChangeText={(value) => formik.setFieldValue('curp', value)}
            error={formik.errors.curp}
            autoCapitalize="characters"
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          />

          <Input
            style={{ marginTop: 15 }}
            label="Nombre"
            placeholder="Ingrese su nombre"
            value={formik.values.nombre}
            onChangeText={(value) => formik.setFieldValue('nombre', value)}
            error={formik.errors.nombre}
            autoCapitalize="characters"
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          />

          <Input
            style={{ marginTop: 15 }}
            label="Apellido paterno"
            placeholder="Ingrese su apellido paterno"
            value={formik.values.apellidoPaterno}
            onChangeText={(value) => formik.setFieldValue('apellidoPaterno', value)}
            error={formik.errors.apellidoPaterno}
            autoCapitalize="characters"
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          />

          <Input
            style={{ marginTop: 15 }}
            label="Apellido materno"
            placeholder="Ingrese su apellido materno"
            value={formik.values.apellidoMaterno}
            onChangeText={(value) => formik.setFieldValue('apellidoMaterno', value)}
            error={formik.errors.apellidoMaterno}
            autoCapitalize="characters"
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          />

          <Input
            style={{ marginTop: 15 }}
            value={formik.values.correoElectronico}
            onChangeText={(value) => formik.setFieldValue('correoElectronico', value)}
            label="Correo Electrónico"
            placeholder="Ingresa tu Correo Electrónico"
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            error={formik.errors.correoElectronico}
          />

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
                  formik.errors.lada ? styles.inputContainerError : {},
                ]}
              >
                <Text
                  style={[
                    styles.countryCode,
                    { color: formik.values.lada ? '#010101' : PLACEHOLDER_TEXT_COLOR },
                  ]}
                  numberOfLines={1}
                >
                  {
                    formik.values.lada || 'Ingresa tu clave larga distancia automática'
                  }
                </Text>

                <Icon name="angle-down" size={25} color="#010101" />
              </View>

              {Boolean(formik.errors.lada) && (
                <Text style={styles.error}>{formik.errors.lada}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Input
            value={formik.values.numeroDeTelefono}
            onChangeText={(value) => formik.setFieldValue('numeroDeTelefono', value)}
            label="Número de teléfono"
            keyboardType="phone-pad"
            placeholder="Ingresa tu número de teléfono"
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            error={formik.errors.numeroDeTelefono}
          />

        </Card>

        <Button
          loading={loading}
          style={styles.cta}
          size="large"
          text="Registrarse"
          onPress={formik.handleSubmit}
        />
      </KeyboardAwareScrollView>

      <LadaModalPicker
        visible={showCodePicker}
        onClose={() => setShowCodePicker(false)}
        onSelect={(lada) => formik.setFieldValue('lada', lada.lada)}
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
  error: {
    marginTop: 4,
    color: '#FF3B30',
    fontSize: 12,
  },
  inputContainerError: {
    borderColor: '#FF3B30',
  },
});

export default RegistroCiudadanoScreen;
