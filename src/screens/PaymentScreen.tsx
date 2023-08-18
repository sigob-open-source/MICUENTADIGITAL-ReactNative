import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ReactNativeNetPay from 'react-native-netpay';
import Header from '../components/Header';
import { useNotification } from '../components/DropDownAlertProvider';
import { getRecibo } from '../services/padrones';
import { getReciboExterno, generarTicket, generateRecibo } from '../services/recaudacion/recibo';
import Input from '../components/Input';
import Button from '../components/Button';

import { createCharge } from '../services/netpay';

interface FormValues {
  Email: string;
  Nombre: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
}

const SCHEMA = yup.object({
  Email: yup.string().typeError('Campo no válido').required('Campo requerido'),
  Nombre: yup.string().typeError('Campo no válido').required('Campo requerido'),
  ApellidoMaterno: yup.string().typeError('Campo no válido').required('Campo requerido'),
  ApellidoPaterno: yup.string().typeError('Campo no válido').required('Campo requerido'),
});

const PaymentScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const notify = useNotification();
  const navigation = useNavigation();

  ReactNativeNetPay.init('pk_netpay_RZWqFZTckZHhIaTBzogznLReu', { testMode: true });
  // ReactNativeNetPay.init('pk_netpay_DBmockYZopdDnTdhYhGJCDXfe', { testMode: false });

  const form = useFormik<FormValues>({
    initialValues: {
      Email: '',
      Nombre: '',
      ApellidoMaterno: '',
      ApellidoPaterno: '',
    },
    validationSchema: SCHEMA,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);

      const cardToken = await ReactNativeNetPay.openCheckout(false);

      const responsecard = await createCharge(
        respone.total,
        cardToken,
        response.referenciaNetpay,
        values.nombre,
        values.apellido_paterno,
        values.ApellidoMaterno,
        values.email,
      );
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header item="DATOS DE PAGO" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerModal}>

          <View style={styles.modaling}>
            <Text style={styles.title}>Datos de pago</Text>
            <View style={{
              height: 1,
              width: '100%',
              backgroundColor: '#F1F1F1',
              marginVertical: 10,
            }}
            />

            <View style={styles.textInputContainer}>
              <Input
                placeholder="Nombre(s)"
                value={form.values.Nombre}
                onChangeText={(value) => form.setFieldValue('nombre', value)}
                error={form.errors.Nombre}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Input
                placeholder="Apellido Paterno"
                value={form.values.ApellidoPaterno}
                onChangeText={(value) => form.setFieldValue('apellidoPaterno', value)}
                error={form.errors.ApellidoPaterno}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Input
                placeholder="Apellido Materno"
                value={form.values.ApellidoMaterno}
                onChangeText={(value) => form.setFieldValue('apellidoMaterno', value)}
                error={form.errors.ApellidoMaterno}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Input
                label="* Correo Electrónico"
                placeholder="Correo Electrónico"
                value={form.values.Email}
                onChangeText={(value) => form.setFieldValue('email', value)}
                error={form.errors.Email}
              />
            </View>

            <Button
              loading={loading}
              text="Datos de Tarjeta"
              style={styles.button}
              onPress={form.handleSubmit}
            />

            <View style={{
              height: 1,
              width: '100%',
              backgroundColor: '#F1F1F1',
              marginVertical: 10,
            }}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modaling: {
    backgroundColor: 'white',
    height: 400,
    width: '85%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4E585F',
  },
  textInputContainer: {
    marginVertical: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#582E44',
    width: 230,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textButton: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: 12,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  imageContainer: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaymentScreen;
