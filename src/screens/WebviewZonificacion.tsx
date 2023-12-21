// External dependencies
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

// Internal dependencies
import LoadingComponent from '../components/LoadingComponent';
import { obtenerToken } from '../services/juarez-predial/auth';
import { RootStackParamList } from '../types/navigation';

// Types & Interfaces
type TWebViewZonificacionScreenProps = NativeStackScreenProps<
RootStackParamList,
'zonoficacion'
>;

const WebViewZonificacionScreen = ({ route, navigation }: TWebViewZonificacionScreenProps) => {
  const { params: datos } = route;
  const dataRecibo = datos;
  const [isLoading, setIsLoading] = useState(false);

  const nowTime = new Date().getTime();

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

  // const registrarPredioSigob = async (folio:string) => {
  //   const apiUrl = 'https://apiingresos.migob.mx/catastro/predio-pagado/';

  //   const predioPago ={

  //   }

  //   const headers = {
  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     'Content-Type': 'application/json',
  //   };
  //   const response = await axios.post(apiUrl, pagoData, { headers });
  // };

  const realizarPagoInsitu = async (
    montoTotal: string,
    folio: string,
    merchantReferenceCode: string,
    orderId: string,
  ) => {
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
            <total>${montoTotal}</total>
            <conceptos>
              <pago>
                <infraccion>${folio}</infraccion>
                <importe>${montoTotal}</importe>
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

    try {
      // Realize the GET request with the encoded XML data in the URL
      const response = await axios.get<string>(url, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
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
      intentos += 1;
      if (intentos === 3) {
        return null;
      }
    }

    try {
      // Realize the GET request with the encoded XML data in the URL
      const response = await axios.get<string>(url, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
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
    }

    return null;
  };

  const infraccionesPayment = async (
    montoTotal: string,
    folio: string,
    merchantReferenceCode: string,
    orderId: string,
  ) => {
    const maxIntentos = 5;

    for (let intento = 1; intento <= maxIntentos; intento += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await realizarPagoInsitu(
          montoTotal,
          folio,
          merchantReferenceCode,
          orderId,
        );
        // La operación tuvo éxito, retornar la respuesta
        return response as string;
      } catch (error) {
        const typedError = error as Error;
        console.log(`Error en el intento ${intento}:`, typedError.message);
      }
    }

    // Si llegamos aquí, significa que todos los intentos fallaron
    console.log(`Todos los intentos fallaron después de ${maxIntentos} intentos.`);
    return null;
  };

  const realizarPago = async (
    montoTotal: string,
    folio: string,
    transactionTokenId: string,
    clave: string,
  ) => {
    const { access } = await obtenerToken();
    const totalImporte = parseFloat(montoTotal);
    try {
      const apiUrl = 'https://ingresosapi.juarez.gob.mx/api/predial/registrar-pago/';
      const pagoData = {
        sucursal: '1',
        fecha_pago: fechaHoraActual,
        transaccion_folio: folio,
        operacion: transactionTokenId,
        autorizacion: transactionTokenId,
        total: totalImporte,
        detalle: [
          {
            referencia: clave,
            importe: totalImporte,
          },
        ],
      };

      const headers = {
        Authorization: `Bearer ${access}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      };
      console.log(JSON.stringify(pagoData, null, 2));
      console.log(JSON.stringify(headers, null, 2));

      const response = await axios.post(apiUrl, pagoData, { headers });
      // Aquí puedes manejar la respuesta de la solicitud
      console.log('Respuesta de la solicitud de pago:', response.data);
      return response.data as string;
    } catch (error) {
    // Manejar errores si los hubiera
      console.error('Error al realizar la solicitud de pago:', error);
      throw error;
    }
  };

  const getPagoWS = async (
    montoTotal: string,
    folio:string,
    transactionTokenId: string,
    clave: string,
  ) => {
    const maxRetries = 3;

    for (let retry = 1; retry <= maxRetries; retry += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await realizarPago(
          montoTotal,
          folio,
          transactionTokenId,
          clave,
        );

        if (response !== null) {
          // Éxito: Retorna la respuesta
          return response;
        }
      } catch (error) {
        const typedError = error as Error;
        console.error(`Error en el intento ${retry}:`, typedError.message);
      }

      // Esperar antes de realizar el siguiente intento
      // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 800)); // Esperar 1 segundo
    }

    // Si todos los intentos fallan
    console.log(`Todos los intentos fallaron después de ${maxRetries} intentos.`);
    return null;
  };

  const handleMessage = async (event: WebViewMessageEvent) => {
    // const data = JSON.parse(event.nativeEvent.data);
    // console.log(data);
    setIsLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = JSON.parse(event.nativeEvent.data) as {
      status: string;
      transactionTokenId: string;
      merchantReferenceCode: string;
      amount?: number;
      responseMsg?: string;
    };

    const { datosRecibo } = datos;

    const fecha = obtenerFechaHoraActual();
    console.log(data);
    if (data.status === 'success' || data.status === 'DONE') {
      const {
        padronSeleccionado,
        folio,
        montoTotal,
        datosDePago,
      } = datosRecibo;

      const datoParaRecibo = {
        nombre: dataRecibo.datosRecibo.nombre || 'Sin Nombre',
        lastName: dataRecibo.datosRecibo.apellidoPaterno || 'Sin Apellido',
        total: data.amount || 0,
        fechaActual: fecha,
        numeroAut: data.transactionTokenId,
      };

      let successPayment;
      console.log('este el padron selecionado', padronSeleccionado);
      if (padronSeleccionado === 'Infracciones') {
        successPayment = await infraccionesPayment(
          montoTotal,
          folio,
          data.merchantReferenceCode,
          data.transactionTokenId,
        );
        if (successPayment) {
          setIsLoading(false);
          navigation.reset({
            index: 1,
            routes: [
              {
                name: 'menuInicio',
              },
              {
                name: 'pdfViewer',
                params: { datoParaRecibo },
              },
            ],
          });
        } else {
          setIsLoading(false);

          navigation.reset({
            index: 0,
            routes: [{
              name: 'errorScreen',
            }],
          });
        }
      }
      if (padronSeleccionado === 'Predio') {
        successPayment = await getPagoWS(
          montoTotal,
          folio,
          data.transactionTokenId,
          datosDePago.clave,
        );

        if (successPayment) {
          setIsLoading(false);

          navigation.reset({
            index: 1,
            routes: [
              {
                name: 'menuInicio',
              },
              {
                name: 'pdfViewer',
                params: { datoParaRecibo },
              },
            ],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{
              name: 'errorScreen',
            }],
          });
        }
      }
    } else {
      console.log(data?.responseMsg);
      setIsLoading(false);

      navigation.reset({
        index: 0,
        routes: [{
          name: 'menuInicio',
        }],
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: `https://tresdeese.migob.mx/?nombre=${datos.datosRecibo.nombre}&apellidoParterno=${datos.datosRecibo.apellidoPaterno}&montoTotal=${datos.datosRecibo.montoTotal}&email=${datos.datosRecibo.email}&phone=${datos.datosRecibo.phone}&merchantReferenceCode=${datos.datosRecibo.datosDePago.merchan + nowTime}` }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
      />
      {
          (isLoading) ? <LoadingComponent /> : null
      }
    </View>
  );
};

export default WebViewZonificacionScreen;
