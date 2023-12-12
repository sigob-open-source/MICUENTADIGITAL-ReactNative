import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Yup from 'yup';

import Header from '../components/Header';
import { RootStackParamList } from '../types/navigation';

// Types & Interfaces
interface IFormValues {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  celular: string;
}

type ViewPagoNetpayProps = NativeStackScreenProps<RootStackParamList, 'pagoNetpay'>;
const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('Campo requerido'),
  apellidoPaterno: Yup.string().required('Campo requerido'),
  apellidoMaterno: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
  celular: Yup.string().matches(/^[0-9]+$/, 'Solo números').required('Campo requerido'),
});

const ViewPagoNetpay = ({ route, navigation }: ViewPagoNetpayProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const datosDePago = route.params.params;

  const obtenerFechaHoraActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear();
    const hora = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

    // Formatea la fecha y hora en el formato deseado (YYYY-MM-DD HH:mm:ss)
    const fechaHoraFormateada = `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    return fechaHoraFormateada;
  };

  const handlePayment = (values: IFormValues) => {
    // Aquí puedes realizar la acción de pago o enviar los datos al servidor
    // Puedes mostrar el spinner mientras se procesa la acción
    setIsLoading(true);
    console.log(values);
    const { total } = datosDePago;
    const { folio } = datosDePago;
    const { padron } = datosDePago;

    const fechaActual = obtenerFechaHoraActual();

    const datosRecibo = {
      datosDePago,
      nombre: values.nombre,
      apellidoPaterno: values.apellidoPaterno,
      apellidoMaterno: values.apellidoMaterno,
      phone: values.celular,
      email: values.email,
      fecha: fechaActual,
      montoTotal: total,
      padronSeleccionado: padron,
      folio,
    };

    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'menuInicio',
        },
        {
          name: 'zonoficacion',
          params: { datosRecibo },
        },
      ],
    });

    // Simulación de una acción asíncrona
    setTimeout(() => {
      setIsLoading(false);
      // Realiza cualquier acción necesaria después del pago
    }, 2000); // Simulación de 2 segundos de carga
  };

  return (
    <View style={styles.container}>
      <Header item="Datos de pago" />
      <View style={{ flex: 1, padding: 20 }}>
        <Formik
          initialValues={{
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            email: '',
            celular: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handlePayment(values)}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('nombre')}
                value={values.nombre}
                placeholder="Nombre(s)"
              />
              {touched.nombre && errors.nombre && (
              <Text style={styles.error}>{errors.nombre}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange('apellidoPaterno')}
                value={values.apellidoPaterno}
                placeholder="Apellido Paterno"
              />
              {touched.apellidoPaterno && errors.apellidoPaterno && (
              <Text style={styles.error}>{errors.apellidoPaterno}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange('apellidoMaterno')}
                value={values.apellidoMaterno}
                placeholder="Apellido Materno"
              />
              {touched.apellidoMaterno && errors.apellidoMaterno && (
              <Text style={styles.error}>{errors.apellidoMaterno}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={handleChange('celular')}
                value={values.celular}
                placeholder="Número de Celular"
              />
              {touched.celular && errors.celular && (
              <Text style={styles.error}>{errors.celular}</Text>
              )}

              <TouchableOpacity onPress={handleSubmit as unknown as () => void}>
                <View style={styles.button}>
                  <Text style={{ color: '#FFFFFF' }}>SEGUIR CON EL PAGO</Text>
                </View>
              </TouchableOpacity>

              <Spinner
                visible={isLoading}
                textContent="Procesando..."
                textStyle={styles.spinnerText}
              />
            </>
          )}
        </Formik>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  error: {
    color: '#C93131',
  },
  spinnerText: {
    color: '#FFF',
  },
  button: {
    backgroundColor: '#79142A',
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewPagoNetpay;
