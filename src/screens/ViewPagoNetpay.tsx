import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import ReactNativeNetPay from 'react-native-netpay';
import xml2js from 'xml2js';
import Header from '../components/Header';
import { useNotification } from '../components/DropDownAlertProvider';
import { createCharge, detallesDePago } from '../services/netpay';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('Campo requerido'),
  apellidoPaterno: Yup.string().required('Campo requerido'),
  apellidoMaterno: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
  celular: Yup.string().matches(/^[0-9]+$/, 'Solo números').required('Campo requerido'),
});

const ViewPagoNetpay = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const datosDePago = route.params.params;
  const gettimer = Date.now();

  const notify = useNotification();
  const navigation = useNavigation();

  // Funcion llamada al dar al boton realizar pago prod
  // ReactNativeNetPay.init('pk_netpay_DBmockYZopdDnTdhYhGJCDXfe', { testMode: false });
  ReactNativeNetPay.init('pk_netpay_RZWqFZTckZHhIaTBzogznLReu', { testMode: true });

  const GetCardToken = async () => {
    let cardToken;
    try {
      cardToken = await ReactNativeNetPay.openCheckout(false);
      return cardToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getCharge = async (
    total: number,
    token: string,
    values,
  ) => {
    try {
      const responsecard = await createCharge(
        total,
        token,
        values,
      );
      return responsecard;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getDetallePago = async (responsecard) => {
    try {
      const responseDetalle = await detallesDePago(responsecard?.transactionTokenId);
      console.log('====================================');
      console.log(JSON.stringify(responseDetalle, null, 2));
      console.log('====================================');
      if (responseDetalle.status === 'DONE') {
        return responseDetalle;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

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
  const fechaHoraActual = obtenerFechaHoraActual();

  // Función para realizar una solicitud de pago
  const realizarPago = async (token) => {
    try {
      const apiUrl = 'https://ingresosapi.juarez.gob.mx/api/predial/registrar-pago/';
      const pagoData = {
        sucursal: '1',
        fecha_pago: fechaHoraActual,
        transaccion_folio: datosDePago.folio,
        operacion: '4057',
        autorizacion: '4057',
        total: datosDePago.total,
        detalle: [
          {
            referencia: '1-998-1-1-0',
            importe: datosDePago.total,
          },
        ],
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(apiUrl, pagoData, { headers });
      // Aquí puedes manejar la respuesta de la solicitud
      console.log('Respuesta de la solicitud de pago:', response.data);
      return response.data;
    } catch (error) {
    // Manejar errores si los hubiera
      console.error('Error al realizar la solicitud de pago:', error);
      throw error;
    }
  };

  const getPagoWS = async (token:string) => {
    try {
      const response = await realizarPago(token);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const realizarPagoInsitu = async (merchantReferenceCode, orderId) => {
    // Encode the XML data as a string
    const xmlData = `
    <PAGOTRANSCAPTURA>
      <ENCABEZADO>
        <fecha>${fechaHoraActual}</fecha>
        <operacion>${new Date().getTime()}</operacion>
        <registros>1</registros>
        <registroid>T00A</registroid>
      </ENCABEZADO>
      <PAGOS>
        <REGISTRO>
          <pago_insitu>
            <autorizacion>${orderId}</autorizacion>
            <cfolio>${merchantReferenceCode}</cfolio>
            <fecha_hora>${fechaHoraActual}</fecha_hora>
            <total>${datosDePago.total}</total>
            <conceptos>
              <pago>
                <infraccion>${datosDePago.folio}</infraccion>
                <importe>${datosDePago.total}</importe>
              </pago>
            </conceptos>
          </pago_insitu>
        </REGISTRO>
      </PAGOS>
    </PAGOTRANSCAPTURA>`;

    // Construct the URL with the encoded XML data as a query parameter
    const baseUrl = 'https://wstrans01.juarez.gob.mx/captura.tcgi';
    const url = `${baseUrl}?ingreso=${xmlData}`;
    let intentos = 0;
    let bandera = false;

    while (bandera) {
      try {
        // Realize the GET request with the encoded XML data in the URL
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/xml',
          },
        });

        // Check the response status
        if (response.status === 200) {
          // The request was successful
          // You can process the response here
          bandera = true;
          const responseData = response.data;
          console.log('Response Data:', responseData);
          return responseData;
          break;
        }
        console.error('Request was not successful. Status Code:', response.status);
      } catch (error) {
        console.error('Error occurred during the request:', error);
        intentos++;
        if (intentos == 3) {
          bandera = true;
          return null;
          break;
        }
      }
    }

    try {
      // Realize the GET request with the encoded XML data in the URL
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });

      // Check the response status
      if (response.status === 200) {
        // The request was successful
        // You can process the response here
        const responseData = response.data;
        console.log('Response Data:', responseData);
        return responseData;
      }
      console.error('Request was not successful. Status Code:', response.status);
    } catch (error) {
      console.error('Error occurred during the request:', error);
      return null;
    }
  };

  // const realizarPagoInsitu = async (merchantReferenceCode, orderId) => {
  // // Datos para la solicitud
  //   const xmlData = `
  //   <PAGOTRANSCAPTURA>
  //     <ENCABEZADO>
  //       <fecha>${fechaHoraActual}</fecha>
  //       <operacion>${new Date().getTime()}</operacion>
  //       <registros>1</registros>
  //       <registroid>T00A</registroid>
  //     </ENCABEZADO>
  //     <PAGOS>
  //       <REGISTRO>
  //         <pago_insitu>
  //           <autorizacion>${orderId}</autorizacion>
  //           <cfolio>${merchantReferenceCode}</cfolio>
  //           <fecha_hora>${fechaHoraActual}</fecha_hora>
  //           <total>${datosDePago.total}</total>
  //           <conceptos>
  //             <pago>
  //               <infraccion>${datosDePago.folio}</infraccion>
  //               <importe>${datosDePago.total}}</importe>
  //             </pago>
  //           </conceptos>
  //         </pago_insitu>
  //       </REGISTRO>
  //     </PAGOS>
  //   </PAGOTRANSCAPTURA>`;

  //   // Configurar las cabeceras para enviar XML
  //   const headers = {
  //     'Content-Type': 'application/xml',
  //   };

  //   try {
  //   // Realizar la solicitud POST
  //     const response = await axios.post('https://wstrans01.juarez.gob.mx/captura.tcgi', xmlData, { headers });

  //     // Verificar la respuesta
  //     if (response.status === 200) {
  //     // La solicitud fue exitosa
  //     // Puedes procesar la respuesta aquí
  //       const responseData = response.data;
  //       // Si la respuesta es XML, puedes convertirla a JSON usando xml2js u otra librería
  //       // const jsonResult = await xml2js.parseStringPromise(responseData);
  //       console.log('Respuesta JSON:', responseData);
  //     } else {
  //       console.error('La solicitud no fue exitosa. Código de estado:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error al realizar la solicitud:', error);
  //   }
  // };

  const infraccionesPayment = async (merchantReferenceCode, orderId) => {
    try {
      const response = await realizarPagoInsitu(merchantReferenceCode, orderId);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Llamar a la función para realizar el pago insitu

  const handlePayment = async (values) => {
    // Aquí puedes realizar la acción de pago o enviar los datos al servidor
    // Puedes mostrar el spinner mientras se procesa la acción
    setIsLoading(true);
    console.log(values);
    const { total } = datosDePago;
    // const { folio } = datosDePago;

    // const responseCardToken = await GetCardToken();
    // let responsecard = {};
    // let responseDetalle = {};
    const fechaActual = await obtenerFechaHoraActual();

    const datosRecibo = {
      datosDePago,
      nombre: values.nombre,
      apellidoPaterno: values.apellidoPaterno,
      apellidoMaterno: values.apellidoMaterno,
      email: values.email,
      fecha: fechaActual,
      montoTotal: total,
    };

    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'menuInicio',
        },
        {
          name: 'zonoficacion',
          datos: { datosRecibo },
        },
      ],
    });

    // if (responseCardToken) {
    //   responsecard = await getCharge(
    //     total,
    //     responseCardToken,
    //     values,
    //   );

    //   responseDetalle = await getDetallePago(responsecard);

    //   const fechaActual = await obtenerFechaHoraActual();

    //   // const datosRecibo = {
    //   //   datosDePago,
    //   //   nombre: values.nombre,
    //   //   apellidoPaterno: values.apellidoPaterno,
    //   //   apellidoMaterno: values.apellidoMaterno,
    //   //   fecha: fechaActual,
    //   //   datosNetpayFolio: responseDetalle.merchantReferenceCode,
    //   //   montoTotal: total,
    //   // };

    //   // navigation.reset({
    //   //   index: 1,
    //   //   routes: [
    //   //     {
    //   //       name: 'menuInicio',
    //   //     },
    //   //     {
    //   //       name: 'zonoficacion',
    //   //       datos: { datosRecibo },
    //   //     },
    //   //   ],
    //   // });

    //   if (responseDetalle) {
    //     notify({
    //       type: 'success',
    //       title: '¡Éxito!',
    //       message: 'Pago exitoso',
    //     });

    //     let successPayment;

    //     if (datosDePago.padron === 'Infracciones') {
    //       successPayment = await infraccionesPayment(responseDetalle.merchantReferenceCode, responseDetalle.orderId);
    //     }
    //     if (datosDePago.padron === 'Predios') {
    //       successPayment = await getPagoWS(datosDePago.token);
    //     }

    //     if (successPayment) {
    //       setIsLoading(false);
    //       navigation.reset({
    //         index: 1,
    //         routes: [
    //           {
    //             name: 'menuInicio',
    //           },
    //           {
    //             name: 'pdfViewer',
    //             datos: { datosRecibo },
    //           },
    //         ],
    //       });
    //     } else {
    //       notify({
    //         type: 'error',
    //         title: 'Error',
    //         message: 'No logramos guardar su pago, favor de reportar en ventanilla',
    //       });
    //     }
    //     setIsLoading(false);
    //   } else {
    //     setIsLoading(false);

    //     notify({
    //       type: 'error',
    //       title: 'Error',
    //       message: 'No logramos guardar su pago, favor de reportar en ventanilla',
    //     });
    //   }
    // } else {
    //   notify({
    //     type: 'info',
    //     title: 'Pago Cancelado',
    //     message: 'El pago fue cancelado por el usuario',
    //   });
    // }
    // Simulación de una acción asíncrona
    setTimeout(() => {
      setIsLoading(false);
      // Realiza cualquier acción necesaria después del pago
    }, 2000); // Simulación de 2 segundos de carga
  };

  return (
    <View style={styles.container}>
      <Header item="Datos de pago" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} />
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

              <TouchableOpacity onPress={handleSubmit}>
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
