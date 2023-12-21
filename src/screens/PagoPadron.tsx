/* eslint-disable react/no-array-index-key */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import currency from 'currency.js';
import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import Adeudo from '../components/Adeudo';
import Button from '../components/Button';
import CardItem from '../components/CardItem';
import { useNotification } from '../components/DropDownAlertProvider';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import { consultaInfraccion } from '../services/juarez-infracciones/consultaInfraccion';
import { ConsultaInfraccion_Activa, ConsultaInfraccion_Pagada, StatusInfraccion } from '../services/juarez-infracciones/types/consultaInfraccion';
import { obtenerToken } from '../services/juarez-predial/auth';
import { consultaAdeudo } from '../services/juarez-predial/consultaAdeudo';
import { IConsultaDeAdeudoResponse } from '../services/juarez-predial/types/consultaAdeudo';
import { RootStackParamList } from '../types/navigation';
import fonts from '../utils/fonts';

type PagoPadronScreenProps = NativeStackScreenProps<RootStackParamList, 'pagoPadron'>;

type GetPromiseValue<P> = P extends Promise<infer V> ? V : unknown;
type TInfraccion = GetPromiseValue<ReturnType<typeof consultaInfraccion>>;
type TAdeudo = GetPromiseValue<ReturnType<typeof consultaAdeudo>>;
type TPadronResponse =
  | TInfraccion
  | TAdeudo;

const PagoPadron = ({ route, navigation }: PagoPadronScreenProps) => {
  const insets = useSafeAreaInsets();

  const [padron] = useState(route.params.padron);
  const [padronSearched, setPadronSearched] = useState<TPadronResponse | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  // revison de variable de entorno.
  const [seEncontroAdeudo, setSeEncontroAdeudo] = useState(false);
  const [modalKey, setModalKey] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [tokenPadron, setTokenPadron] = useState<string>('');
  const [statusCheck, setStatusCheck] = useState(false);
  const [statusData, setStatusData] = useState('');

  const [part1, setPart1] = useState('');
  const [part2, setPart2] = useState('');
  const [part3, setPart3] = useState('');
  const [part4, setPart4] = useState('');
  const [part5, setPart5] = useState('');

  const notify = useNotification();

  const handlePart1Change = (text: string) => {
    setPart1(text);
  };

  const handlePart2Change = (text: string) => {
    setPart2(text);
  };

  const handlePart3Change = (text: string) => {
    setPart3(text);
  };

  const handlePart4Change = (text: string) => {
    setPart4(text);
  };

  const handlePart5Change = (text: string) => {
    setPart5(text);
  };

  // Alerta para cuando no se encontro nada acorde a la busqueda
  const showAlert = () => notify({
    type: 'warn',
    title: 'Notificación de Busqueda',
    message: `No se encontró ningun ${padron?.descripcion} que concuerde con la busqueda`,
  });

  const consultarInfracciones = async (folioInfraccion: string) => {
    try {
      console.log(folioInfraccion);
      const response = await consultaInfraccion(folioInfraccion);

      return response;
    } catch (error) {
      console.log('este es el error que regreso', error);
      return null;
    }
  };

  const consultarPredio = async (folioPredio: string) => {
    try {
      const { access } = await obtenerToken();
      setTokenPadron(access);

      const response = await consultaAdeudo(folioPredio, {
        accessToken: access,
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setStatusCheck(false);
    setSeEncontroAdeudo(false);

    Keyboard.dismiss();

    const conquetenar = `${part1}-${part2}-${part3}-${part4}-${part5}`;
    let response;
    if (padron?.descripcion === 'Predio') {
      response = await consultarPredio(conquetenar);
    }
    if (padron?.descripcion === 'Infracciones') {
      response = await consultarInfracciones(searchText);
    }
    console.log(JSON.stringify(response, null, 2));

    if (response) {
      setPadronSearched(response);

      if (padron?.descripcion === 'Infracciones') {
        const typedResponse = response as Exclude<TInfraccion, null> & {
          importes?: {
            importeTotal: number;
          };
        };

        const { status } = typedResponse;

        if (typedResponse.status === StatusInfraccion.PAGADA) {
          const infraccionPagada = response as ConsultaInfraccion_Pagada;

          notify({
            type: 'info',
            title: 'Atención',
            message: `${status} el dia ${infraccionPagada.fechaPago}`,
          });
        } else if (
          status === StatusInfraccion.EBRIEDAD
          || status === StatusInfraccion.PERITOS
        ) {
          setStatusCheck(true);
          setStatusData(status);
        }

        if (typedResponse?.importes?.importeTotal) {
          setTotalAmount(typedResponse.importes.importeTotal);
          setSeEncontroAdeudo(true);
        }
      }

      if (padron?.descripcion === 'Predio') {
        const typedResponse = response as IConsultaDeAdeudoResponse & {
          motivo?: string;
          totales?: {
            total: number;
          };
        };
        if (!typedResponse.aprobado) {
          notify({
            type: 'warn',
            title: 'Atención',
            message: `${typedResponse?.motivo}`,
          });
        } else if (typedResponse?.totales?.total) {
          setTotalAmount(typedResponse.totales.total);
          setSeEncontroAdeudo(true);
        }
      }
    } else {
      setIsLoading(false);
      showAlert();
    }
    setModalKey(modalKey + 1);
    setIsLoading(false);
  };

  // // Llama a la función para realizar el pago (reemplaza 'aqui_su_token' con tu token real)
  // const token = 'aqui_su_token';

  const doPayment = () => {
    setLoading(true);

    if (padron?.descripcion === 'Predio') {
      const { folio, informacion } = padronSearched as {
        folio: string;
        informacion:{ clave: string; };
      };

      const AccesToken = tokenPadron;
      const datosDePago = {
        total: totalAmount,
        folio,
        token: AccesToken,
        clave: informacion.clave,
        padron: 'Predio',
        merchan: `P-${informacion.clave}-`,
      };
      navigation.navigate('pagoNetpay', { params: datosDePago });
    }

    if (padron?.descripcion === 'Infracciones') {
      const { folio } = padronSearched as {
        folio: string;
      };

      const datosDePago = {
        total: totalAmount,
        folio,
        padron: 'Infracciones',
        merchan: `I-${folio}-`,
      };

      navigation.navigate('pagoNetpay', { params: datosDePago });
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header
        item={
          padron?.descripcion === 'Predio'
            ? 'Pago de Predial'
            : padron?.descripcion
        }
      />

      <View style={{ marginTop: '5%' }}>
        <Text style={styles.inputText}>
          {padron?.descripcion === 'Predio'
            ? 'Buscar por Clave Catastral:'
            : ''}
          {padron?.descripcion === 'Infracciones'
            ? 'Consultar por Folio de Infracción'
            : ''}
        </Text>

        <View>
          {/* Si es 'Predio', muestra la máscara */}
          {padron?.descripcion === 'Predio' ? (
            <View style={styles.inputmsk}>
              <View style={styles.container2}>
                <View>
                  <TextInput
                    style={styles.input}
                    value={part1}
                    onChangeText={handlePart1Change}
                    maxLength={2}
                    keyboardType="numeric"
                  />

                  <Text style={styles.textInput}>*Localidad</Text>
                </View>

                <Text style={styles.separator}>-</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={part2}
                    onChangeText={handlePart2Change}
                    maxLength={3}
                    keyboardType="numeric"
                  />

                  <Text style={styles.textInput}>*Sector</Text>
                </View>

                <Text style={styles.separator}>-</Text>

                <View>
                  <TextInput
                    style={styles.input}
                    value={part3}
                    onChangeText={handlePart3Change}
                    maxLength={3}
                    keyboardType="numeric"
                  />

                  <Text style={styles.textInput}>*Manzana</Text>
                </View>

                <Text style={styles.separator}>-</Text>

                <View>
                  <TextInput
                    style={styles.input}
                    value={part4}
                    onChangeText={handlePart4Change}
                    maxLength={3}
                    keyboardType="numeric"
                  />

                  <Text style={styles.textInput}>*Lote</Text>
                </View>

                <Text style={styles.separator}>-</Text>

                <View>
                  <TextInput
                    style={styles.input}
                    value={part5}
                    onChangeText={handlePart5Change}
                    maxLength={4}
                    keyboardType="numeric"
                  />

                  <Text style={styles.textInput}>*Condominio</Text>
                </View>
              </View>
            </View>
          ) : (
          // Si no es 'Predio', muestra el otro contenido
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}
            >
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="numeric"
                  placeholderTextColor="#C4C4C4"
                  onChangeText={(text) => setSearchText(text)}
                  placeholder="Buscar..."
                />
              </View>

              <TouchableWithoutFeedback
                onPress={() => {
                  setTotalAmount(0);
                  void handleSearch();
                }}
              >
                <View style={styles.iconContainer}>
                  <Icon name="search" size={18} color="white" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
      </View>

      {padron?.descripcion === 'Infracciones' ? (
      // Código a ejecutar si la condición es verdadera
      // Por ejemplo:

        <ScrollView style={{ alignSelf: 'center' }}>
          {statusCheck ? (
            <View
              style={{
                height: 95,
                width: 300,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                padding: 15,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '800',
                  color: '#582E45',
                }}
              >
                PAGO NO PERMITIDO
                {' \n'}
                (
                {statusData || ''}
                )
              </Text>
              <View
                style={{
                  height: 1,
                  width: 250,
                  backgroundColor: '#D4D9DB',
                  marginVertical: 2,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  color: '#404040',
                }}
              >
                {' '}
                Favor de pasar a ventanilla para realizar su pago
                {' '}
              </Text>
            </View>
          ) : null}

          {seEncontroAdeudo ? (
            <Adeudo data={padronSearched as ConsultaInfraccion_Activa}>
              {
                (padronSearched as ConsultaInfraccion_Activa)?.motivos.map((cargo, index) => (
                  <CardItem
                    key={index}
                    cargo={cargo}
                  />
                ))
              }
            </Adeudo>
          ) : null}

          {isLoading ? <LoadingComponent /> : null}
        </ScrollView>
      ) : (
        // Código a ejecutar si la condición es falsa
        // Por ejemplo:
        <ScrollView style={{ alignSelf: 'center' }}>
          {seEncontroAdeudo ? (
            <View style={styles.cardPredios}>
              <View>
                <Text style={{ fontSize: RFPercentage(0.04), color: '#313030', fontWeight: '600' }}>
                  {(padronSearched as IConsultaDeAdeudoResponse)?.informacion
                    .propietario
                    || 'Sin Nombre Registrado'}
                </Text>

                <Text
                  style={{
                    fontSize: RFPercentage(0.03),
                    color: '#747474',
                    fontWeight: '400',
                    marginTop: 2,
                  }}
                >
                  {(padronSearched as IConsultaDeAdeudoResponse)?.informacion
                    .domicilio || 'Sin Direccion'}
                </Text>
              </View>

              <View
                style={{
                  width: '90%',
                  height: 1,
                  backgroundColor: '#E6E6E6',
                  marginVertical: 6,
                }}
              />

              <View style={{ width: '100%', alignItems: 'center' }}>
                <Text
                  style={{ fontSize: RFPercentage(0.03), color: '#865770', fontWeight: '600' }}
                >
                  ACTUAL
                </Text>
              </View>
              <Text style={styles.predialsubtex}>IMPUESTO PREDIAL:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose
                  .adeudo_actual.impuesto_predial
                  || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>IMPUESTO UNIVERSITARIO:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.adeudo_actual
                  .impuesto_universitario || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>
                FIDEICOMISO PASO DEL NORTE:
              </Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose
                  .adeudo_actual.fideicomiso || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>
                CONTRIBUCION EXTRAORDINARIA:
              </Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.adeudo_actual
                  .contribucion_extraordinaria || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>D.A.P:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose
                  .adeudo_actual.dap || '0.00'}
              </Text>
              <View />

              <View
                style={{
                  width: '90%',
                  height: 1,
                  backgroundColor: '#E6E6E6',
                  marginVertical: 6,
                }}
              />

              <View style={{ width: '100%', alignItems: 'center' }}>
                <Text
                  style={{ fontSize: RFPercentage(0.03), color: '#865770', fontWeight: '600' }}
                >
                  RECARGOS
                </Text>
              </View>
              <Text style={styles.predialsubtex}>IMPUESTO PREDIAL:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.recargos.impuesto_predial || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>IMPUESTO UNIVERSITARIO:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose
                  .recargos.impuesto_universitario
                  || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>
                FIDEICOMISO PASO DEL NORTE:
              </Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.recargos.fideicomiso || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>
                CONTRIBUCION EXTRAORDINARIA:
              </Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.recargos
                  .contribucion_extraordinaria || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>D.A.P:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.recargos.dap || '0.00'}
              </Text>
              <View />

              <View
                style={{
                  width: '90%',
                  height: 1,
                  backgroundColor: '#E6E6E6',
                  marginVertical: 6,
                }}
              />

              <View style={{ width: '100%', alignItems: 'center' }}>
                <Text
                  style={{ fontSize: RFPercentage(0.03), color: '#865770', fontWeight: '600' }}
                >
                  REZAGOS
                </Text>
              </View>
              <Text style={styles.predialsubtex}>IMPUESTO PREDIAL:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.rezago.impuesto_predial || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>IMPUESTO UNIVERSITARIO:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose
                  .rezago.impuesto_universitario
                  || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>
                FIDEICOMISO PASO DEL NORTE:
              </Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.rezago.fideicomiso || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>
                CONTRIBUCION EXTRAORDINARIA:
              </Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose
                  .rezago.contribucion_extraordinaria
                  || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>D.A.P:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.rezago.dap || '0.00'}
              </Text>
              <View />

              <View
                style={{
                  width: '90%',
                  height: 1,
                  backgroundColor: '#E6E6E6',
                  marginVertical: 6,
                }}
              />

              <View style={{ width: '100%', alignItems: 'center' }}>
                <Text
                  style={{ fontSize: RFPercentage(0.03), color: '#865770', fontWeight: '600' }}
                >
                  RECARGOS DEL REZAGO
                </Text>
              </View>
              <Text style={styles.predialsubtex}>IMPUESTO PREDIAL:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose
                  .recargo_rezago.impuesto_predial
                  || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>IMPUESTO UNIVERSITARIO:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.recargo_rezago
                  .impuesto_universitario || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>
                FIDEICOMISO PASO DEL NORTE:
              </Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose
                  .recargo_rezago.fideicomiso || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>
                CONTRIBUCION EXTRAORDINARIA:
              </Text>

              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.recargo_rezago
                  .contribucion_extraordinaria || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>D.A.P:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.desglose.recargo_rezago.dap || '0.00'}
              </Text>
              <View />

              <View
                style={{
                  width: '90%',
                  height: 1,
                  backgroundColor: '#E6E6E6',
                  marginVertical: 6,
                }}
              />

              <Text style={styles.predialsubtex}>SUBTOTAL:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.totales.subtotal || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>CARGOS DE COBRANZA:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.totales.total_gastos_de_cobranza || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>DESCUENTO:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.totales.total_descuentos || '0.00'}
              </Text>

              <Text style={styles.predialsubtex}>REDONDEO:</Text>
              <Text style={styles.predialsubtex2}>
                {(padronSearched as IConsultaDeAdeudoResponse)?.totales.ajuste_redondeo || '0.00'}
              </Text>

              <View />
            </View>
          ) : null}
        </ScrollView>
      )}

      {isLoading ? <LoadingComponent /> : null}

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        {totalAmount === 0 ? null : (
          <Text style={styles.totalText}>
            Total:
            {' '}
            {currency(totalAmount).format()}
          </Text>
        )}

        <View key={modalKey}>
          {totalAmount > 0 ? (
            <Button
              onPress={doPayment}
              style={styles.buttonPrint}
              text="Pagar"
              iconName="search"
              loading={loading}
            />
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setTotalAmount(0);
                void handleSearch();
              }}
            >
              <View style={styles.buttonPrintDisabled}>
                <Text style={styles.textButton}>Realizar Búsqueda</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </View>
  );
};

export default PagoPadron;

const styles = StyleSheet.create({
  cardPredios: {
    backgroundColor: '#FFFFFF',
    height: 'auto',
    width: 330,
    borderRadius: 5,
    marginTop: 10,
    padding: 20,
    borderTopWidth: 2,
    borderColor: '#865770',
  },
  predialsubtex: {
    fontSize: RFPercentage(0.03),
    color: '#747474',
    fontWeight: '600',
    marginTop: 3,
  },
  predialsubtex2: {
    fontSize: RFPercentage(0.03),
    color: '#313030',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
  headText: {
    textAlign: 'center',
    color: 'black',
    fontSize: RFPercentage(0.05),
    fontFamily: fonts.black,
    marginBottom: 10,
  },
  inputText: {
    color: '#404040',
    fontSize: RFPercentage(0.03),
    fontFamily: fonts.medium,
    marginHorizontal: 23,
  },
  menuContainer: {
    marginVertical: '3%',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  textInputContainer: {
    flex: 1,
    marginVertical: 5,
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#79142A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
    marginBottom: 14,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 7 },
    shadowRadius: 32,
    shadowOpacity: 0.25,
    elevation: 20,
  },
  iconContainer: {
    backgroundColor: 'gray',
    height: 46,
    padding: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconAvanzadoContainer: {
    backgroundColor: '#79142A',
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    backgroundColor: 'green',
  },
  text: {
    color: 'white',
    padding: 5,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  textButton: {
    color: 'white',
    fontFamily: fonts.bold,
    fontSize: RFPercentage(0.04),
    textAlign: 'center',
    margin: 10,
  },
  buttonPrint: {
    backgroundColor: 'green',
    width: Dimensions.get('window').width * 0.85,
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.6,
    marginVertical: 5,
  },
  buttonPrintDisabled: {
    backgroundColor: '#582E45',
    width: Dimensions.get('window').width * 0.85,
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.6,
    marginVertical: 5,
  },
  totalText: {
    color: 'black',
    fontSize: RFPercentage(0.05),
    padding: 5,
    fontFamily: fonts.bold,
    textAlign: 'left',
  },
  loading: {},
  row: {
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  inputmsk: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },

  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#582E44',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 46,
    width: 53,
  },
  separator: {
    paddingHorizontal: 5,
  },
  textInput: {
    fontSize: RFPercentage(0.03),
    color: '#582E44',
  },
});
