import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../components/Input';
import ListPicker from '../components/ListPicker';
import { useNotification } from '../components/DropDownAlertProvider';
import { getReciboExterno } from '../services/recaudacion/recibo';
import Header from '../components/Header';
import Button from '../components/Button';

import { toMoment } from '../utils/formatters';

import { getUsosDeCFDI, getRegimenesFiscales, postFacturar } from '../services/padrones';

const SCHEMA = yup.object({
  rfc: yup.string().typeError('Campo no válido').required('Campo requerido'),
  codigo_postal: yup.string().typeError('Campo no válido').required('Campo requerido'),
  razon_social: yup.string().typeError('Campo no válido').required('Campo requerido'),
  email: yup.string().typeError('Campo no válido').required('Campo requerido'),
  uso: yup.string().typeError('Campo no válido').required('Campo requerido'),
  regimen_fiscal: yup.string().typeError('Campo no válido').required('Campo requerido'),

});
interface FormValues {
  rfc: string;
  codigo_postal: string;
  razon_social: string;
  email: string;
  uso: string;
  regimen_fiscal: string;

}

interface RegimenFiscal {
  id: number;
  label: string;
}

const InformacionDelRecibo = ({ route: { params: { response } } }) => {
  const [usos, setUsos] = useState([]);
  const [regimentesFiscales, setRegimentesFiscales] = useState([]);
  const [showCodePicker, setShowCodePicker] = useState<boolean>(false);
  const [showCodePicker2, setShowCodePicker2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();
  const notify = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      const _usos = await getUsosDeCFDI();
      const _regimenes = await getRegimenesFiscales();
      setUsos(_usos);
      setRegimentesFiscales(_regimenes);
    };
    void fetchData();
  }, []);

  const form = useFormik<FormValues>({
    initialValues: {
      rfc: '',
      codigo_postal: '',
      razon_social: '',
      email: '',
      uso: '',
      regimen_fiscal: '',
    },
    validationSchema: SCHEMA,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);

      const response2 = await postFacturar({
        codigo_postal: values.codigo_postal,
        email: values.email,
        entidad: 1,
        fecha_de_pago: response.fecha_de_creacion,
        folio: response.folio,
        razon_social: values.razon_social,
        regimen_fiscal: values.regimen_fiscal,
        rfc: values.rfc,
        uso: values.uso,
      });

      if (!response2) {
        notify({
          message: 'Revise sus datos de facturación',
          title: 'Ha ocurrido un error',
          type: 'warn',
        });
        setLoading(false);
        return;
      }
      const reciboBase = await getReciboExterno({
        entidad: 1,
        folio: response.folio,
      });

      if (reciboBase?.pdf_de_rfc) {
        setLoading(false);

        notify({
          message: 'Se ha facturado el ticket y enviado a su correo electrónico',
          title: 'Ticket Facturado',
          type: 'success',
        });

        navigation.navigate('descargaFactura', { reciboBase });
        return;
      }
      setLoading(false);
      notify({
        message: response2,
        title: 'Alerta',
        type: 'warn',
      });
    },
  });

  const closebutton = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'menuInicio',
        },
      ],
    });
  };

  const regimenFiscalDisplayText = useMemo(() => {
    const item = regimentesFiscales.find((x) => x.value === Number(form.values.regimen_fiscal));
    return item?.label;
  }, [regimentesFiscales, form.values]);

  const usosDisplayText = useMemo(() => {
    const item = usos.find((x) => x.value === Number(form.values.uso));
    return item?.label;
  }, [usos, form.values]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Header item="Recibo de Pago" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.cardContainer}>
          <Text style={styles.titleCard}>Información Fiscal</Text>

          <View style={styles.textInputContainer}>
            <Input
              placeholder="RFC"
              value={form.values.rfc}
              onChangeText={(value) => form.setFieldValue('rfc', value)}
              error={form.errors.rfc}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Input
              placeholder="Código postal"
              value={form.values.codigo_postal}
              onChangeText={(value) => form.setFieldValue('codigo_postal', value)}
              error={form.errors.codigo_postal}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Input
              placeholder="Razón Social"
              value={form.values.razon_social}
              onChangeText={(value) => form.setFieldValue('razon_social', value)}
              error={form.errors.razon_social}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Input
              placeholder="Correo Electrónico"
              value={form.values.email}
              onChangeText={(value) => form.setFieldValue('email', value)}
              error={form.errors.email}
            />
          </View>

          <TouchableWithoutFeedback
            onPress={() => setShowCodePicker(true)}
          >
            <View style={{ marginVertical: 8 }}>
              <Text style={styles.countryCodeLabel}>
                *Regimen Fiscal:
              </Text>
              <View
                style={[
                  styles.countryCodeContainer,
                  form.errors.regimen_fiscal ? styles.inputContainerError : {},
                ]}
              >
                <Text
                  style={[
                    styles.countryCode,
                  ]}
                  numberOfLines={1}
                >
                  {
                    regimenFiscalDisplayText || 'Ingresa'
                  }
                </Text>

                <Icon name="angle-down" size={25} color="#010101" />
              </View>

              {Boolean(form.errors.regimen_fiscal) && (
                <Text style={styles.error}>{form.errors.regimen_fiscal}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => setShowCodePicker2(true)}
          >
            <View style={{ marginVertical: 8 }}>
              <Text style={styles.countryCodeLabel}>
                *Uso de facturación:
              </Text>
              <View
                style={[
                  styles.countryCodeContainer,
                  form.errors.uso ? styles.inputContainerError : {},
                ]}
              >
                <Text
                  style={[
                    styles.countryCode,
                  ]}
                  numberOfLines={1}
                >
                  {
                    usosDisplayText || 'Ingresa uso de factura'
                  }
                </Text>

                <Icon name="angle-down" size={25} color="#010101" />
              </View>

              {Boolean(form.errors.uso) && (
                <Text style={styles.error}>{form.errors.uso}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <Button
            loading={loading}
            text="Facturar"
            style={styles.cardButton}
            onPress={form.handleSubmit}
          />

          <Button
            loading={loading}
            text="Salir"
            style={styles.cardButton}
            onPress={closebutton}
          />

        </View>
      </ScrollView>
      <ListPicker
        visible={showCodePicker}
        onClose={() => setShowCodePicker(false)}
        onSelect={(value) => form.setFieldValue('regimen_fiscal', value.value)}
        items={regimentesFiscales}
      />
      <ListPicker
        visible={showCodePicker2}
        onClose={() => setShowCodePicker2(false)}
        onSelect={(value) => form.setFieldValue('uso', value.value)}
        items={usos}
      />
    </SafeAreaView>
  );
};

export default InformacionDelRecibo;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    height: '112%',
    width: '112%',
    top: -150,
    left: -20,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  cardContainer: {
    flex: 2,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  titleCard: {
    fontWeight: '700',
    fontSize: 15,
    color: '#582E44',
  },
  subtitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#4E585F',
  },
  infoContainer: {
    backgroundColor: 'red',
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 2,
    backgroundColor: '#ffffff',
  },
  cardButton: {
    backgroundColor: '#582E44',
    width: 260,
    height: 45,
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
  cardButtonFit: {
    width: 260,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    color: '#582E44',
  },
  textButtonFit: {
    fontWeight: '500',
    color: '#582E44',
    fontSize: 12,
  },
  textInputContainer: {
    marginVertical: 5,
    width: '100%',
  },
  countryCodeLabel: {
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '600',
    marginBottom: 4,
  },
  countryCodeContainer: {
    width: '100%',
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
  countryCode: {
    color: '#000',
    fontSize: 16,
    padding: 0,
    flex: 1,
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
