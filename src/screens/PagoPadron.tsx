import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Text,
  NativeModules,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import ReactNativeNetPay from 'react-native-netpay';
import fonts from '../utils/fonts';
import round from '../utils/round';
import { generarTicket, generateRecibo } from '../services/recaudacion/recibo';
import { createCharge } from '../services/netpay';

import Button from '../components/Button';

import Header from '../components/Header';
import Adeudo from '../components/Adeudo';
import CardItem from '../components/CardItem';

import {
  getPadrones,
  getVehiculo,
  getPredio,
  getEmpresa,
  getCiudadano,
  getAdeudoPadron,
  getInfracciones,
  getExpedienteDeComercio,
  getExpedienteDeMercado,
  getPoliciaEspecial,
  getExpedienteDeLicencia,
  getExpedienteDeAnuncio,
} from '../services/padrones';

import { useNotification } from '../components/DropDownAlertProvider';
import { generarReferenciaDePagoNetpayPublic } from '../services/recaudacion/pago';
import getExpiryDate from '../utils/get-expiry-date';
import sortCargos from '../utils/sorterCargos';

const PagoPadron = ({ route }) => {
  const [padron, setPadron] = useState();
  const [padronSearched, setPadronSearched] = useState();
  const [searchText, setSearchText] = useState('de');
  const [resultCargos, setResultCargos] = useState([]);
  const [nameSearch, setNameSearch] = useState();
  const [newData, setNewData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [padrones, setPadrones] = useState();

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

  // Alerta para cuando no se encontro nada acorde a la busqueda
  const showAlert = () => notify({
    type: 'warn',
    title: 'Notificación de Busqueda',
    message: `No se encontró ningun ${padron?.descripcion} que concuerde con la busqueda`,
  });

  const handleSearch = async () => {
    setIsLoading(true);
    setNewData(false);
    // console.log(padron.descripcion);
    let response;
    let numeroDePadron;
    if (padron?.descripcion === 'Ciudadano') {
      response = await getCiudadano({ q: searchText });
      numeroDePadron = 1;
      (response !== null) ? setNameSearch(response?.nombre_completo) : null;
    } else if (padron?.descripcion === 'Empresa') {
      response = await getEmpresa({ q: searchText });
      numeroDePadron = 2;
      (response !== null) ? setNameSearch(response?.razon_social) : null;
    } else if (padron?.descripcion === 'Predio') {
      response = await getPredio({ q: searchText });
      numeroDePadron = 3;
      (response !== null) ? setNameSearch(response?.descripcion) : null;
    } else if (padron?.descripcion === 'Infracciones') {
      response = await getInfracciones({ q: searchText });
      numeroDePadron = 19;
      (response !== null) ? setNameSearch(response?.descripcion) : null;
    } else if (padron?.descripcion === 'Expediente De Anuncio') {
      response = await getExpedienteDeAnuncio({ q: searchText });
      numeroDePadron = 24;
      (response !== null) ? setNameSearch(response?.descripcion) : null;
    } else if (padron?.descripcion === 'Licencia De Funcionamiento') {
      response = await getExpedienteDeLicencia({ q: searchText });
      numeroDePadron = 22;
      (response !== null) ? setNameSearch(response?.descripcion) : null;
    } else if (padron?.descripcion === 'Mercado') {
      response = await getExpedienteDeMercado({ q: searchText });
      numeroDePadron = 21;
      (response !== null) ? setNameSearch(response?.descripcion) : null;
    } else if (padron?.descripcion === 'Policia especial') {
      response = await getPoliciaEspecial({ q: searchText });
      numeroDePadron = 18;
      (response !== null) ? setNameSearch(response?.descripcion) : null;
    } else if (padron?.descripcion === 'Comercio Informal') {
      response = await getExpedienteDeComercio({ q: searchText });
      numeroDePadron = 20;
      (response !== null) ? setNameSearch(response?.descripcion) : null;
    } else if (padron?.descripcion === 'Vehicular') {
      response = await getVehiculo(searchText);
      numeroDePadron = 4;
      (response !== null) ? setNameSearch(response?.numero_de_placa) : null;
    }
    if (response === null || response === undefined) {
      setIsLoading(false);
      showAlert();
    } else {
      setPadronSearched(response);
      response = await getAdeudoPadron(response, numeroDePadron);
      setResultCargos(response?.cargos || []);
      setNewData(true);
      const [rounded] = round(response?.cargos.map((item) => { const cargo = reduceArrCargos(item); return cargo.adeudo_total; }).reduce((prev, curr) => prev + curr, 0));
      setTotalAmount(rounded);
      console.log('total amount', rounded);
    }
    setModalKey(modalKey + 1);
    setIsLoading(false);
  };

  // Funcion llamada al dar al boton realizar pago prod
  // ReactNativeNetPay.init('pk_netpay_DBmockYZopdDnTdhYhGJCDXfe', { testMode: false });
  ReactNativeNetPay.init('pk_netpay_RZWqFZTckZHhIaTBzogznLReu', { testMode: true });

  const dopayment = async () => {
    setLoading(true);
    const cardToken = await ReactNativeNetPay.openCheckout(false);

    const descripcion = (resultCargos.length === 1
      && resultCargos[0].descripcion.length <= 250
      ? resultCargos[0].descripcion
      : padron.descripcion) as string;

    const cargoIds = resultCargos.map((c) => c.id);

    const referenciaNetpay = await generarReferenciaDePagoNetpayPublic(
      {
        amount: totalAmount,
        currency: 'MXN',
        description: descripcion,
        expiryDate: getExpiryDate(padron.id),
        paymentMethod: 'cash',
        billing: {
          canal_de_pago: 3,
          cargos: cargoIds,
          padron_id: padronSearched.id,
          tipo_de_padron: padron.id,
          importe: totalAmount,
          fecha: moment().format('DD-MM-YYYY'),
          merchantReferenceCode: null,
          ciudadano: null,
        },
      },
      { entidad: 1 },
    );

    const folioNetpay = referenciaNetpay?.folio_netpay;

    const responsecard = await createCharge(
      totalAmount,
      cardToken,
      folioNetpay,
      padronSearched.nombre,
      padronSearched.apellido_paterno,
      padronSearched.email,
      padronSearched.numero_de_celular,
    );

    const { success, result } = await generateRecibo({
      es_netpay_custom: true,
      canal_de_pago: 3,
      folio: folioNetpay,
      response: responsecard,
    }, { entidad: 1 });

    if (success) {
      const { success: successTicket, result: resultTicket } = await generarTicket({
        entidad_id: 1,
        recibos_id: [result.id],
        tramite_en_proceso: false,
      }, { entidad: 1 });

      let base64 = result.data;

      if (successTicket) {
        base64 = resultTicket.data;
      }

      notify({
        type: 'success',
        title: '¡Éxito!',
        message: 'Pago exitoso',
      });

      setLoading(false);

      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'menuInicio',
          },
          {
            name: 'pdfViewer',
            params: {
              reciboB64: `data:application/pdf;base64,${base64}`,
            },
          },
        ],
      });
    } else {
      setLoading(false);

      notify({
        type: 'error',
        title: 'Error',
        message: 'No logramos guardar su pago, favor de reportar en ventanilla',
      });
    }
    setLoading(false);
  };

  const calcular = async () => {
    const sumall = resultCargos.map((item) => item.importe).reduce((prev, curr) => prev + curr, 0);
    console.log('suma', sumall);

    if (sumall) {
      const paymentResponse = await NativeModules.RNNetPay.doTrans(sumall.toFixed(2));
      console.log('entro a la 145');

      if (paymentResponse.success) {
        const ticketResponse = await NativeModules.RNNetPay.printTicket();

        if (ticketResponse.success) {
          notify(dispatch, {
            type: 'success',
            title: 'Pago realizado',
            message: 'El pago se ha procesado exitosamente',
          });

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'menuInicio',
                  params: {},
                },
              ],
            }),
          );
        } else {
          notify(dispatch, {
            type: 'error',
            title: 'Error',
            message: 'No se pudo generar el Ticket',
          });
        }
      }
    } else {
      notify(dispatch, {
        type: 'error',
        title: 'Error',
        message: 'No se pudo generar el pago',
      });
    }
    setLoading(false);
  };

  // Calcula los totales y descuentas
  const reduceArrCargos = (cargo) => {
    const {
      descuentos_especiales,
      actualizaciones,
      recargos,
      descuentos_aplicables,
      gastos,
      importe,
    } = cargo;
    let adeudo_total;
    let descuentos_de_actualizacion = 0;
    let descuentos_de_recargos = 0;
    let descuentos_gastos_totales = 0;
    let multa_recargos = 0;
    let multa_gastos = 0;
    let descuentos_de_recargos_str = '';
    let descuentos_de_actualizaciones_str = '';
    let descuentos_de_gastos_str = '';
    const recargo_total = recargos.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    recargos.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      let ttlMultaRec;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_recargos_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      if (item?.es_multa) {
        const filteredRecargos = recargos.filter(
          (recargo) => recargo.es_multa === true,
        );
        ttlMultaRec = filteredRecargos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
      } else {
        ttlMultaRec = 0;
      }
      multa_recargos += ttlMultaRec;
      descuentos_de_recargos += ttlDesc;
    });
    gastos.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      let ttlMultaGto;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_gastos_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      if (item.es_multa) {
        const filteredMultas = gastos.filter((gasto) => gasto.es_multa === true);
        ttlMultaGto = filteredMultas.reduce(
          (accum, curr) => accum + curr.importe,
          0,
        );
      } else {
        ttlMultaGto = 0;
      }
      descuentos_gastos_totales += ttlDesc;
      multa_gastos += ttlMultaGto;
    });

    actualizaciones.forEach((item) => {
      const { descuentos } = item;
      let ttlDesc;
      if (descuentos.length) {
        ttlDesc = descuentos.reduce(
          (accum, curr) => accum + curr.importe_total,
          0,
        );
        descuentos.forEach((i) => {
          descuentos_de_actualizaciones_str += `\n\r-${i.comentarios} `;
        });
      } else {
        ttlDesc = 0;
      }
      descuentos_de_actualizacion += ttlDesc;
    });

    const descuentos_especiales_totales = descuentos_especiales.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const descuentos_aplicables_total = descuentos_aplicables.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const actualizaciones_totales = actualizaciones.reduce(
      (accum, curr) => accum + curr.importe_total,
      0,
    );

    const gastos_totales = gastos.reduce(
      (accum, curr) => accum + curr.importe,
      0,
    );

    const descuentos_totales = descuentos_aplicables_total + descuentos_especiales_totales;
    const multas_totales = multa_gastos + multa_recargos;
    adeudo_total = importe
      - descuentos_totales
      + (recargo_total - descuentos_de_recargos)
      + (actualizaciones_totales - descuentos_de_actualizacion)
      + (gastos_totales - descuentos_gastos_totales)
      + multas_totales;
    adeudo_total = adeudo_total;

    return {
      descuentos_de_actualizaciones_str,
      descuentos_de_recargos_str,
      descuentos_de_gastos_str,
      descuentos_gastos_totales,
      descuentos_de_recargos,
      descuentos_de_actualizacion,
      descuentos_aplicables_total,
      descuentos_especiales_totales,
      descuentos_totales,
      multas_totales,
      multa_recargos,
      multa_gastos,
      actualizaciones_totales,
      recargo_total: recargo_total - multa_recargos,
      adeudo_total,
      gastos_totales: gastos_totales - multa_gastos,
    };
  };

  const itsData = () => {
    let informationData = '';

    if (nameSearch === undefined) {
      if (padron?.descripcion === 'Infracciones') {
        informationData = padronSearched?.folio;
      } else {
        informationData = ' No se encontraron datos';
      }
    } else {
      informationData = nameSearch;
    }
    return informationData;
  };

  const sortedCargos = useMemo(() => {
    if (!Array.isArray(resultCargos)) {
      return [];
    }
    return sortCargos(resultCargos);
  }, [resultCargos]);

  return (
    <View style={styles.container}>
      <Header item={padron?.descripcion === 'Predio' ? 'Pago de Predial' : padron?.descripcion} imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} />

      <View style={{ marginTop: '5%' }}>
        <Text style={styles.inputText}>
          {padron?.descripcion === 'Predio' ? 'Buscar por Clave catastral:\nEjemplo: xx-xxx-xxx-xxx-xxxx' : ''}
          {padron?.descripcion === 'Ciudadano' ? 'Buscar por: Clave, RFC o CURP' : ''}
          {padron?.descripcion === 'Contribuyente' ? 'Buscar por: Clave, RFC o CURP' : ''}
          {padron?.descripcion === 'Infracciones' ? 'Número o Folio de Infracción' : ''}
          {padron?.descripcion === 'Expediente De Anuncio' ? 'Clave, RFC o CURP' : ''}
          {padron?.descripcion === 'Mercado' ? 'Clave, RFC o CURP' : ''}
          {padron?.descripcion === 'Licencia De Funcionamiento' ? 'Clave, RFC o CURP' : ''}
          {padron?.descripcion === 'Comercio Informal' ? 'Clave, RFC o CURP' : ''}
          {padron?.descripcion === 'Policia especial' ? 'Clave, RFC o CURP' : ''}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <View style={styles.textInputContainer}>
            <TextInput
              autoCapitalize="characters"
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
      </View>

      <ScrollView style={{ alignSelf: 'center' }}>
        {
          (newData === true && resultCargos?.[0])
            ? (
              <Adeudo
                nombre={itsData()}
                padron={route.params?.padron?.descripcion}
                cargo={totalAmount}
                children={sortedCargos?.map((cargo, index) => (
                  <CardItem
                    key={index}
                    info={
                      `${
                        cargo.descripcion
                      }`
                    }
                    cargo={cargo}
                    reduceCargo={reduceArrCargos(cargo)}
                    navegar="detallesPadron"
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
        (isLoading) ? <ActivityIndicator style={styles.loading} size="large" color="#fc9696" /> : null
      }
      </ScrollView>

      <View style={styles.footer}>
        {
        totalAmount === 0 ? (
          null
        )
          : (
            <Text style={styles.totalText}>
              Total:
              {' $'}
              {totalAmount?.toFixed(2)}
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

});
