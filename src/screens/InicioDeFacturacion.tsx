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
import Header from '../components/Header';
import { useNotification } from '../components/DropDownAlertProvider';
import { getRecibo } from '../services/padrones';
import { getReciboExterno } from '../services/recaudacion/recibo';
import Input from '../components/Input';
import Button from '../components/Button';

interface FormValues {
  transaccion: string;
  folio_de_recibo: string;
  folio_de_facturacion: string;
  referencia_de_impresion: string;
}

const SCHEMA = yup.object({
  transaccion: yup.string().typeError('Campo no válido'),
  folio_de_recibo: yup.string().typeError('Campo no válido'),
  folio_de_facturacion: yup.string().typeError('Campo no válido'),
  referencia_de_impresion: yup.string().typeError('Campo no válido').required('Campo requerido'),
});

const InicioDeFacturacion = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [recibo, setRecibo] = useState(null);

  const notify = useNotification();
  const navigation = useNavigation();

  const form = useFormik<FormValues>({
    initialValues: {
      transaccion: '',
      folio_de_facturacion: '',
      folio_de_recibo: '',
      referencia_de_impresion: '',
    },
    validationSchema: SCHEMA,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      const response = await getReciboExterno({
        entidad: 1,
        referencia_de_seguridad: values.referencia_de_impresion,
        folio: values.folio_de_recibo,
        folio_de_facturacion: values.folio_de_facturacion,
        id: values.transaccion,
      });

      if (response) {
        if (response?.pdf_de_rfc) {
          notify({
            message: 'Este Ticket ya fue facturado! Revise su correo',
            title: 'Ticket ya facturado!',
            type: 'info',
          });
          setLoading(false);
        } else {
          setLoading(false);
          navigation.navigate('informacionRecibo', { response });
        }
      } else {
        setLoading(false);
        notify({
          message: 'NO se encontró el recibo.',
          title: 'Alerta',
          type: 'warn',
        });
      }
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header item="Buscar Ticket" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerModal}>

          <View style={styles.modaling}>
            <Text style={styles.title}>Folio de recibo</Text>
            <View style={{
              height: 1,
              width: '100%',
              backgroundColor: '#F1F1F1',
              marginVertical: 10,
            }}
            />

            <View style={styles.textInputContainer}>
              <Input
                placeholder="Transacción"
                value={form.values.transaccion}
                onChangeText={(value) => form.setFieldValue('transaccion', value)}
                error={form.errors.transaccion}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Input
                placeholder="Folio recibo"
                value={form.values.folio_de_recibo}
                onChangeText={(value) => form.setFieldValue('folio_de_recibo', value)}
                error={form.errors.folio_de_recibo}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Input
                placeholder="Folio de facturación"
                value={form.values.folio_de_facturacion}
                onChangeText={(value) => form.setFieldValue('folio_de_facturacion', value)}
                error={form.errors.folio_de_facturacion}
              />
            </View>

            <View style={styles.textInputContainer}>
              <Input
                placeholder="Referencia de impresión"
                value={form.values.referencia_de_impresion}
                onChangeText={(value) => form.setFieldValue('referencia_de_impresion', value)}
                error={form.errors.referencia_de_impresion}
              />
            </View>

            <Button
              loading={loading}
              text="Consultar recibo"
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

export default InicioDeFacturacion;
