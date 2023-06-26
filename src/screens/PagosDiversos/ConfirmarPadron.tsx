/* eslint-disable @typescript-eslint/no-non-null-assertion */
// External dependencies
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
// Internal dependencies
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/HeaderV2';
import InformacionDePadron from '../../components/InformacionDePadron';
import { RootStackParamList } from '../../types/navigation';
import { useAppSelector } from '../../store-v2/hooks';
import { PADRONES_PAGOS_DIVERSOS } from '../../utils/constants';
import { CiudadanoCajaProps } from '../../services/cuentaunicasir/ciudadano-types';
import { EmpresaCajaProps } from '../../services/cuentaunicasir/empresa-types';
import Input from '../../components/Input';
import LadaModalPicker from '../../components/LadaPicker';
import { ContribuyenteCajaProps } from '../../services/empresas/contribuyentes-caja-public-types';
import { updateCiudadano } from '../../services/cuentaunicasir/ciudadano';
import ladas from '../../dataset/ladas.json';
import { setPadron } from '../../store-v2/reducers/pagos-diversos';
import { updateContribuyete } from '../../services/empresas/contribuyentes-caja-public';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<RootStackParamList, 'confirmarPadron'>;

type ConfirmarPadronScreenProps = NavigationProps;

interface FormValues {
  email: string;
  countryCode: string;
  phoneNumber: string;
}

// Constants
const FORM_SCHEMA = yup.object({
  email: yup
    .string()
    .typeError('Campo no válido')
    .email('Correo electrónico no válido')
    .required('El campo es requerido'),
  countryCode: yup
    .string()
    .typeError('Campo no valido'),
  phoneNumber: yup
    .string()
    .typeError('Campo no valido')
    .required('El campo es requerido')
    .matches(/[0-9]{10}/, 'Ingrese un número válido'),
});

/**
 * Pantalla de confirmación de padron empleada en
 * el flujo de pagos diversos.
 *
 * En esta pantalla el usuario puede ver la información
 * del padrón que buscó para después proceder a añadir
 * cargos.
 */

const ConfirmarPadronScreen = ({ navigation }: ConfirmarPadronScreenProps) => {
  const [showCodePicker, setShowCodePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const pagosDiversosRepo = useAppSelector((state) => state.pagosDiversos);
  const tipoDePadron = pagosDiversosRepo.tipoDePadron!;
  const padron = pagosDiversosRepo.padron!;

  const dispatch = useDispatch();

  const datosPadron = padron as CiudadanoCajaProps;

  const updateCiudadanoHandler = async (
    formikHelpers: FormikHelpers<FormValues>,
    ladaId: number,
    telefono: number,
    email: string,
  ) => {
    const typedPadron = padron as CiudadanoCajaProps;

    const {
      success: updated,
      errors: errorDetail,
    } = await updateCiudadano(typedPadron.id, {
      email,
      lada: ladaId,
      numero_de_celular: telefono,
    }, {
      entidad: 1,
    });

    if (updated) {
      const copy = { ...typedPadron };

      copy.email = email;
      copy.lada = ladaId;
      copy.numero_de_celular = telefono;
      dispatch(setPadron(copy));

      return true;
    }

    if (errorDetail && errorDetail.fields) {
      formikHelpers.setFieldError('email', errorDetail.fields.email);
      formikHelpers.setFieldError('countryCode', errorDetail.fields.lada);
      formikHelpers.setFieldError('phoneNumber', errorDetail.fields.numero_de_celular);
    }

    return false;
  };

  const updateEmpresaHandler = async (
    formikHelpers: FormikHelpers<FormValues>,
    ladaId: number,
    telefono: number,
    email: string,
  ) => {
    const typedPadron = padron as EmpresaCajaProps;

    const {
      success: updated,
      errors: errorDetail,
    } = await updateCiudadano(typedPadron.ciudadano.id, {
      email,
      lada: ladaId,
      numero_de_celular: telefono,
    }, {
      entidad: 1,
    });

    if (updated) {
      const copy = JSON.parse(JSON.stringify(typedPadron)) as EmpresaCajaProps;

      copy.ciudadano.email = email;
      copy.ciudadano.lada = ladaId;
      copy.ciudadano.numero_de_celular = telefono;

      dispatch(setPadron(copy));

      return true;
    }

    if (errorDetail && errorDetail.fields) {
      formikHelpers.setFieldError('email', errorDetail.fields.email);
      formikHelpers.setFieldError('countryCode', errorDetail.fields.lada);
      formikHelpers.setFieldError('phoneNumber', errorDetail.fields.numero_de_celular);
    }

    return false;
  };

  const updateContribuyenteHandler = async (
    formikHelpers: FormikHelpers<FormValues>,
    ladaId: number,
    telefono: number,
    email: string,
  ) => {
    const typedPadron = padron as CiudadanoCajaProps;

    const {
      success: updated,
      errors: errorDetail,
    } = await updateContribuyete(typedPadron.id, {
      correo_electronico: email,
      lada_celular: ladaId,
      telefono_celular: telefono,
    }, {
      entidad: 1,
    });

    if (updated) {
      const copy = { ...typedPadron };

      copy.email = email;
      copy.lada = ladaId;
      copy.numero_de_celular = telefono;
      dispatch(setPadron(copy));

      return true;
    }

    if (errorDetail && errorDetail.fields) {
      formikHelpers.setFieldError('email', errorDetail.fields.correo_electronico);
      formikHelpers.setFieldError('countryCode', errorDetail.fields.lada_celular);
      formikHelpers.setFieldError('phoneNumber', errorDetail.fields.telefono_celular);
    }

    return false;
  };

  const defaultEmail = useMemo(() => {
    if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.CIUDADANO) {
      const typedPadron = padron as CiudadanoCajaProps;
      return typedPadron.email;
    }

    if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.CONTRIBUYENTE) {
      const typedPadron = padron as ContribuyenteCajaProps;
      return typedPadron.correo_electronico;
    }

    if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.EMPRESA) {
      const typedPadron = padron as EmpresaCajaProps;
      return typedPadron.ciudadano.email;
    }

    return null;
  }, [tipoDePadron, padron]);

  const defaultContact = useMemo(() => {
    if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.CIUDADANO) {
      const typedPadron = padron as CiudadanoCajaProps;
      return [typedPadron.lada, typedPadron.numero_de_celular] as [number, number];
    }

    if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.CONTRIBUYENTE) {
      const typedPadron = padron as ContribuyenteCajaProps;
      return [typedPadron.lada_celular, typedPadron.telefono_celular] as [number, number];
    }

    if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.EMPRESA) {
      const typedPadron = padron as EmpresaCajaProps;
      return [
        typedPadron.ciudadano.lada,
        typedPadron.ciudadano.numero_de_celular,
      ] as [number, number];
    }
    return [null, null];
  }, [tipoDePadron, padron]);

  const hasDefaultContact = Boolean(defaultContact[0]) && Boolean(defaultContact[1]);

  const shouldRenderContactInfoForm = !defaultEmail || !hasDefaultContact;

  const buttonText = shouldRenderContactInfoForm ? 'Guardar y Continuar' : 'Continuar';

  const navigateToNextScreen = () => {
    navigation.navigate('busquedaDeCargos');
  };

  const submit = () => {
    if (shouldRenderContactInfoForm) {
      void formik.submitForm();
      return;
    }

    navigateToNextScreen();
  };

  const getLadaFromId = (id: number) => ladas.find((x) => x.id === id)?.lada;

  const formik = useFormik<FormValues>({
    initialValues: {
      countryCode: getLadaFromId(defaultContact[0] || -1) || '52',
      email: defaultEmail || '',
      phoneNumber: String(defaultContact[1] || ''),
    },
    validationSchema: FORM_SCHEMA,
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      setLoading(true);
      const ladaId = ladas.find((x) => x.lada === values.countryCode)!.id;
      const numeroDeTelefono = parseInt(values.phoneNumber, 10);

      let handler;

      if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.CIUDADANO) {
        handler = updateCiudadanoHandler;
      } else if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.EMPRESA) {
        handler = updateEmpresaHandler;
      } else if (tipoDePadron.id === PADRONES_PAGOS_DIVERSOS.CONTRIBUYENTE) {
        handler = updateContribuyenteHandler;
      }

      let shouldContinue = false;
      if (handler) {
        shouldContinue = await handler(helpers, ladaId, numeroDeTelefono, values.email);
      }

      setLoading(false);
      if (shouldContinue) {
        navigateToNextScreen();
      }
    },
  });

  return (
    <>
      <Header
        title="Pagos Diversos"
      />

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View>
            <Card style={styles.deleteContainer}>
              <Text style={styles.deleteText}>
                Borrar Búsqueda
              </Text>

              <Icon
                name="trash-alt"
                size={16}
                color="#ED5B56"
              />
            </Card>
          </View>
        </TouchableWithoutFeedback>

        <InformacionDePadron
          tipoDePadron={tipoDePadron}
          padron={padron}
        />

        {
          shouldRenderContactInfoForm && (
            <Card style={{ marginTop: 12 }}>

              {!defaultEmail && (
                <Input
                  value={formik.values.email}
                  onChangeText={(value) => formik.setFieldValue('email', value)}
                  label="Correo electrónico"
                  keyboardType="email-address"
                  placeholder="Ingresa tu correo electrónico"
                  placeholderTextColor="#cccccc"
                  error={formik.errors.email}
                />
              )}
              { !hasDefaultContact && (
                <>
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
                </>
              )}

            </Card>
          )
        }

        <Button
          text={buttonText}
          style={styles.cta}
          loading={loading}
          disabled={loading}
          onPress={() => submit()}
        />
      </KeyboardAwareScrollView>

      <LadaModalPicker
        visible={showCodePicker}
        onClose={() => setShowCodePicker(false)}
        onSelect={(lada) => formik.setFieldValue('countryCode', lada.lada)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  deleteContainer: {
    marginBottom: 12,
    borderRightWidth: 4,
    borderRightColor: '#ED5B56',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteText: {
    color: '#ED5B56',
    fontWeight: '700',
    fontSize: 14,
  },
  container: {
    padding: 20,
  },
  cardTitle: {
    color: '#364046',
    fontWeight: '700',
    fontSize: 14,
  },
  field: {
    fontSize: 14,
    color: '#818181',
    fontWeight: '500',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#010101',
    fontWeight: '700',
  },
  cta: {
    marginTop: 28,
  },
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
});

export default ConfirmarPadronScreen;
