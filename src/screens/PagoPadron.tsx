import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Text,
} from 'react-native';

import currency from 'currency.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import ReactNativeNetPay from 'react-native-netpay';
import axios from 'axios';
import fonts from '../utils/fonts';
import { generarTicket, generateRecibo } from '../services/recaudacion/recibo';
import { createCharge } from '../services/netpay';
import { consultaAdeudo } from '../services/juarez-predial/consultaAdeudo';

import Button from '../components/Button';

import Header from '../components/Header';
import Adeudo from '../components/Adeudo';
import CardItem from '../components/CardItem';
import LoadingComponent from '../components/LoadingComponent';

import {
  getPadrones,
} from '../services/padrones';

import { consultaVialidad } from '../services/juarez-infracciones/consultaVialidad';
import { TipoDeDocumentoConsulta } from '../services/juarez-infracciones/types/consultaVialidad';
import { consultaInfraccion } from '../services/juarez-infracciones/consultaInfraccion';
import { obtenerToken } from '../services/juarez-predial/auth';

import { useNotification } from '../components/DropDownAlertProvider';
import { generarReferenciaDePagoNetpayPublic } from '../services/recaudacion/pago';
import getExpiryDate from '../utils/get-expiry-date';
import sortCargos from '../utils/sorterCargos';
import { log } from '../services/netpayCDN';

const PagoPadron = ({ route }) => {
  const [padron, setPadron] = useState();
  const [padronSearched, setPadronSearched] = useState();
  const [searchText, setSearchText] = useState();
  // revison de variable de entorno.
  const [resultCargos, setResultCargos] = useState([]);
  const [nameSearch, setNameSearch] = useState();
  const [newData, setNewData] = useState(false);
  const [isBandera, setIsBandera] = useState(false);
  const [modalKey, setModalKey] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [padrones, setPadrones] = useState();
  const [tokenPadron, setTokenPadron] = useState();
  const [statusCheck, setStatusCheck] = useState(false);
  const [statusData, setStatusData] = useState('');

  const [part1, setPart1] = useState('');
  const [part2, setPart2] = useState('');
  const [part3, setPart3] = useState('');
  const [part4, setPart4] = useState('');
  const [part5, setPart5] = useState('');

  const notify = useNotification();
  const navigation = useNavigation();

  const fetchPadrones = async () => {
    const _padrones = await getPadrones();
    setPadrones(_padrones);
  };

  useEffect(() => {
    setPadron(route.params.padron);
    fetchPadrones();
    return () => {};
  }, []);

  const handlePart1Change = (text) => {
    setPart1(text);
  };

  const handlePart2Change = (text) => {
    setPart2(text);
  };

  const handlePart3Change = (text) => {
    setPart3(text);
  };

  const handlePart4Change = (text) => {
    setPart4(text);
  };

  const handlePart5Change = (text) => {
    setPart5(text);
  };

  // Alerta para cuando no se encontro nada acorde a la busqueda
  const showAlert = () => notify({
    type: 'warn',
    title: 'Notificación de Busqueda',
    message: `No se encontró ningun ${padron?.descripcion} que concuerde con la busqueda`,
  });

  const consultarInfracciones = async (folioInfraccion : string) => {
    let intentos = true;
    let intentospt = 0;
    while (intentos) {
      try {
        const response = await consultaInfraccion(folioInfraccion);
        return response;
        break;
      } catch (error) {
        console.log('este es el error que regreso', error);
        console.log('numero de intentos es ', intentospt);
        intentospt++;
        if (intentospt == 3) {
          intentos = false;
          return null;
        }
      }
    }
    // try {
    //   const response = await consultaInfraccion(folioInfraccion);

    //   return response;
    // } catch (error) {
    //   console.log('este es el error que regreso', error);
    //   return false;
    // }
  };

  const consultarPredio = async (folioPredio : string) => {
    try {
      const { access } = await obtenerToken();
      setTokenPadron(access);
      const response = await consultaAdeudo(folioPredio, {
        accessToken: access,
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setNewData(false);
    setStatusCheck(false);
    setIsBandera(false);

    const conquetenar = `${part1}-${part2}-${part3}-${part4}-${part5}`;

    let response;
    if (padron?.descripcion === 'Predio') {
      response = await consultarPredio(conquetenar);
    }
    if (padron?.descripcion === 'Infracciones') {
      response = await consultarInfracciones(searchText);
    }

    if (response) {
      setPadronSearched(response);

      if (padron?.descripcion === 'Infracciones') {
        console.log(JSON.stringify(response, null, 2));

        if (response.status === 'PAGADA') {
          notify({
            type: 'info',
            title: 'Atención',
            message: `${response?.status} el dia ${response.fechaPago}`,
          });
        } else if (response?.status === 'EBRIEDAD' || response?.status === 'PERITOS') {
          setStatusCheck(true);
          setStatusData(response?.status);
        }
        if (response?.importes?.importeTotal) {
          setTotalAmount(response?.importes?.importeTotal);
          setIsBandera(true);
        }
      }

      if (padron?.descripcion === 'Predio') {
        if (response.aprobado === false) {
          notify({
            type: 'warn',
            title: 'Atención',
            message: `${response?.motivo}`,
          });
        } else {
          setTotalAmount(response?.totales?.total);
          setIsBandera(true);
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

  const dopayment = async () => {
    setLoading(true);

    if (padron?.descripcion === 'Predio') {
      const { folio } = padronSearched;
      const AccesToken = tokenPadron;
      const datosDePago = {
        total: totalAmount,
        folio,
        token: AccesToken,
        padron: 'Predio',

      };
      navigation.navigate('pagoNetpay', { params: datosDePago });
    }
    if (padron?.descripcion === 'Infracciones') {
      const { folio } = padronSearched;
      const datosDePago = {
        total: totalAmount,
        folio,
        padron: 'Infracciones',
      };
      navigation.navigate('pagoNetpay', { params: datosDePago });
    }

    setLoading(false);
  };

  const itsData = () => {
    let informationData = '';

    if (nameSearch === undefined) {
      if (padron?.descripcion === 'Infracciones') {
        informationData = padronSearched?.conductor.nombre;
      } else {
        informationData = ' propietario';
      }
    } else {
      informationData = nameSearch;
    }
    return informationData;
  };

  return (
    <View style={styles.container}>

      <Header item={padron?.descripcion === 'Predio' ? 'Pago de Predial' : padron?.descripcion} imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} />

      <View style={{ marginTop: '5%' }}>
        <Text style={styles.inputText}>
          {padron?.descripcion === 'Predio' ? 'Buscar por Clave Catastral:' : ''}
          {padron?.descripcion === 'Infracciones' ? 'Consultar por Folio de Infracción' : ''}
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

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="numeric"
                  color="black"
                  placeholderTextColor="#C4C4C4"
                  onChangeText={(text) => setSearchText(text)}
                  style={styles.textInputStyle}
                  placeholder="Buscar..."
                />
              </View>

              <TouchableWithoutFeedback onPress={() => { setTotalAmount(0); handleSearch(); }}>
                <View style={styles.iconContainer}>
                  <Icon
                    name="search"
                    size={18}
                    color="white"
                  />
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
            <View style={{
              height: 95,
              width: 300,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              padding: 15,
            }}
            >
              <Text style={{ textAlign: 'center', fontWeight: '800', color: '#582E45' }}>
                PAGO NO PERMITIDO
                {' \n'}
                (
                {statusData || ''}
                )
              </Text>
              <View style={{
                height: 1, width: 250, backgroundColor: '#D4D9DB', marginVertical: 2,
              }}
              />
              <Text style={{ textAlign: 'center', fontWeight: '500', color: '#404040' }}> Favor de pasar a ventanilla para realizar su pago </Text>
            </View>
          ) : null}

          {
        (isBandera)
          ? (
            <Adeudo
              data={padronSearched}
              padron={route.params?.padron?.descripcion}
              cargo={totalAmount}
              children={padronSearched.motivos?.map((cargo, index) => (
                <CardItem
                  key={index}
                  data={padronSearched.motivos}
                  cargo={cargo}
                />
              ))}
            />
          )
          : null
      }
          {/* <Adeudo key={index} nombre={nameSearch || ''} padron={padron?.descripcion} cargo={cargo} /> */}
          {newData === true && resultCargos?.[0] === undefined ? (
            <Adeudo
              nombre={
            itsData()
          }
              padron={padron?.descripcion}
              cargo={null}
            />
          ) : null}
          {
      (isLoading) ? <LoadingComponent /> : null
    }
        </ScrollView>

      ) : (
      // Código a ejecutar si la condición es falsa
      // Por ejemplo:
        <ScrollView style={{ alignSelf: 'center' }}>

          {
            (isBandera)
              ? (
                <View style={styles.cardPredios}>
                  <View>
                    <Text style={{ fontSize: 14, color: '#313030', fontWeight: '600' }}>{padronSearched?.informacion.propietario || 'Sin Nombre Registrado'}</Text>

                    <Text style={{
                      fontSize: 10,
                      color: '#747474',
                      fontWeight: '400',
                      marginTop: 2,
                    }}
                    >
                      {padronSearched?.informacion.domicilio || 'Sin Direccion'}
                    </Text>
                  </View>

                  <View style={{
                    width: '90%', height: 1, backgroundColor: '#E6E6E6', marginVertical: 6,
                  }}
                  />

                  <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: '#865770', fontWeight: '600' }}>ACTUAL</Text>
                  </View>
                  <Text style={styles.predialsubtex}>IMPUESTO PREDIAL:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.adeudo_actual.impuesto_predial || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>IMPUESTO UNIVERSITARIO:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.adeudo_actual.impuesto_universitario || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>FIDEICOMISO PASO DEL NORTE:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.adeudo_actual.fideicomiso || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>CONTRIBUCION EXTRAORDINARIA:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.adeudo_actual.contribucion_extraordinaria || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>D.A.P:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.adeudo_actual.dap || '0.00'}</Text>
                  <View />

                  <View style={{
                    width: '90%', height: 1, backgroundColor: '#E6E6E6', marginVertical: 6,
                  }}
                  />

                  <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: '#865770', fontWeight: '600' }}>RECARGOS</Text>
                  </View>
                  <Text style={styles.predialsubtex}>IMPUESTO PREDIAL:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargos.impuesto_predial || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>IMPUESTO UNIVERSITARIO:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargos.impuesto_universitario || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>FIDEICOMISO PASO DEL NORTE:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargos.fideicomiso || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>CONTRIBUCION EXTRAORDINARIA:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargos.contribucion_extraordinaria || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>D.A.P:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargos.dap || '0.00'}</Text>
                  <View />

                  <View style={{
                    width: '90%', height: 1, backgroundColor: '#E6E6E6', marginVertical: 6,
                  }}
                  />

                  <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: '#865770', fontWeight: '600' }}>REZAGOS</Text>
                  </View>
                  <Text style={styles.predialsubtex}>IMPUESTO PREDIAL:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.rezago.impuesto_predial || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>IMPUESTO UNIVERSITARIO:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.rezago.impuesto_universitario || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>FIDEICOMISO PASO DEL NORTE:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.rezago.fideicomiso || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>CONTRIBUCION EXTRAORDINARIA:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.rezago.contribucion_extraordinaria || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>D.A.P:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.rezago.dap || '0.00'}</Text>
                  <View />

                  <View style={{
                    width: '90%', height: 1, backgroundColor: '#E6E6E6', marginVertical: 6,
                  }}
                  />

                  <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: '#865770', fontWeight: '600' }}>RECARGOS DEL REZAGO</Text>
                  </View>
                  <Text style={styles.predialsubtex}>IMPUESTO PREDIAL:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargo_rezago.impuesto_predial || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>IMPUESTO UNIVERSITARIO:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargo_rezago.impuesto_universitario || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>FIDEICOMISO PASO DEL NORTE:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargo_rezago.fideicomiso || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>CONTRIBUCION EXTRAORDINARIA:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargo_rezago.contribucion_extraordinaria || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>D.A.P:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.desglose.recargo_rezago.dap || '0.00'}</Text>
                  <View />

                  <View style={{
                    width: '90%', height: 1, backgroundColor: '#E6E6E6', marginVertical: 6,
                  }}
                  />

                  <Text style={styles.predialsubtex}>SUBTOTAL:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.totales.subtotal || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>CARGOS DE COBRANZA:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.totales.total_gastos_de_cobranza || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>DESCUENTO:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.totales.total_descuentos || '0.00'}</Text>

                  <Text style={styles.predialsubtex}>REDONDEO:</Text>
                  <Text style={styles.predialsubtex2}>{padronSearched?.totales.ajuste_redondeo || '0.00'}</Text>

                  <View />
                </View>
              )
              : null
          }
          {newData === true && resultCargos?.[0] === undefined ? (
            <Adeudo
              nombre={
                itsData()
              }
              padron={padron?.descripcion}
              cargo={null}
            />
          ) : null}
        </ScrollView>
      )}
      {
          (isLoading) ? <LoadingComponent /> : null
      }
      <View style={styles.footer}>
        {
        totalAmount === 0 ? (
          null
        )
          : (
            <Text style={styles.totalText}>
              Total:
              {' '}

              {currency(totalAmount).format()}
            </Text>
          )
      }

        <View key={modalKey}>
          {
            totalAmount > 0 ? (
              <Button
                onPress={dopayment}
                style={styles.buttonPrint}
                text="Pagar"
                iconName="search"
                loading={loading}
              />
            )

              : (
                <TouchableWithoutFeedback onPress={() => { setTotalAmount(0); handleSearch(); }}>
                  <View style={styles.buttonPrintDisabled}>
                    <Text style={styles.textButton}>Realizar Búsqueda</Text>
                  </View>
                </TouchableWithoutFeedback>
              )

          }

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
    fontSize: 10,
    color: '#747474',
    fontWeight: '600',
    marginTop: 3,
  },
  predialsubtex2: {
    fontSize: 10,
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
    fontSize: 20,
    fontFamily: fonts.black,
    marginBottom: 10,
  },
  inputText: {
    color: '#404040',
    fontSize: 12,
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
    fontSize: 16,
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
    fontSize: 20,
    padding: 5,
    fontFamily: fonts.bold,
    textAlign: 'left',
  },
  loading: {

  },
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
    fontSize: 10,
    color: '#582E44',
  },

});
