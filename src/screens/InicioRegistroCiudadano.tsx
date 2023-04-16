/* eslint-disable @typescript-eslint/no-non-null-assertion */
// External dependencies
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

// Internal dependencies
import HeaderV2 from '../components/HeaderV2';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import LadaModalPicker from '../components/LadaPicker';
import ladas from '../dataset/ladas.json';
import { postSolicitarCodigoDeAcceso } from '../services/padrones';

// Types & Interfaces
interface FormValues {
  countryCode: string;
  phoneNumber: string;
}

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

const SendCodeScreen = () => {
  const [showCodePicker, setShowCodePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const formik = useFormik<FormValues>({
    initialValues: {
      countryCode: '',
      phoneNumber: '',
    },
    validationSchema: FORM_SCHEMA,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      const ladaId = ladas.find((x) => x.lada === values.countryCode)!.id;
      const numeroDeTelefono = parseInt(values.phoneNumber, 10);

      console.log({ ladaId, numeroDeTelefono });

      // make api call
      const response = await postSolicitarCodigo(numeroDeTelefono, ladaId);

      if (response) {
        navigation.navigate('codigoScreen');
      } else {
        Alert.alert('Error', 'Ha ocurrido un error');
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const postSolicitarCodigo = async (numeroDeTelefono, ladaId) => {
    const datavalues = {
      lada: ladaId,
      numero_de_celular: numeroDeTelefono,
    };

    const success = await postSolicitarCodigoDeAcceso(datavalues);
    if (success) {
      return success;
    }
  };

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
          loading={loading}
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

export default SendCodeScreen;
