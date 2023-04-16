import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useDropdownAlert } from '../utils/notifications';

import Header from '../components/Header';
import { useNotification } from '../components/DropDowAlertProvider';

import {
  generarReciboPorNetPay,
} from '../services/padrones';

const NetpayPago = ({ route: { params: { responseNetpay, folioNetpay } } }) => {
  const notify = useNotification();

  const navigation = useNavigation();

  const showAlert = (type, responseRecibo) => {
    if (type == 'success') {
      Alert.alert(

        'Pago Exitoso',
        'Su pago se encuentra en proceso!',
        [
          {
            text: 'Entendido',
            style: 'cancel',
            onPress: () => navigation.navigate('PDFviewer', { responseRecibo }),
          },
        ],
      );
    }
    if (type === 'failed') {
      Alert.alert(

        'Error al realizar pago',
        'Favor de intentarlo de nuevo!',
        [
          {
            text: 'Entendido',
            style: 'cancel',
            onPress: () => navigation.navigate('pagos'),
          },
        ],
      );
    }
  };

  const onMessage = async (data) => {
    // Intentar parsear el JSON
    let json;
    try {
      json = JSON.parse(data.nativeEvent.data);
    } catch (error) {
      console.log(error);
    }
    console.log('====================================');
    console.log('json netpay', json);
    console.log('====================================');

    if (json?.status === 'success') {
      const responseRecibo = await generarReciboPorNetPay({
        folio: folioNetpay,
        canal_de_pago: 3,
        response: json,
      });

      notify({
        type: 'success',
        title: 'Éxito',
        message: 'Consulta exitosa ',
      });
      showAlert('success', responseRecibo);
    }

    if (json?.status === 'failed') {
      notify({
        type: 'error',
        title: 'ERROR',
        message: 'Su transacción fue Rechazada. Intentar con otro método de pago.',
      });
      showAlert('failed');
    }

    // console.log(JSON.stringify(json, null, 2));
  };

  const html = `<!DOCTYPE html>
  <html>

  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Getting Started</title>
  </head>

  <body>
    <div style="visibility: hidden;">
      <button style="display: none !important;" id='netpay-checkout' data-street1='Filosofos 100' data-country='Mexico'
        data-city='Monterrey' data-postal-code='64700' data-state='Nuevo Leon'
        data-token='${responseNetpay}' data-phone-number='8110000000'
        data-email='accept@netpay.com.mx' data-merchant-reference-code='${folioNetpay}' data-onsuccess='onPaymentSuccess'
        data-onerror='onPaymentError' data-product-count='2' data-commerce-name='Netpay Sandbox'>Pagar</button>
    </div>
    <script src="https://docs.netpay.mx/cdn/js/latest/checkout.plus.dev.js"></script>
    <script>

      window.onload = () => {
        const btn = document.getElementById('netpay-checkout');
        btn.click();
      }
      NetPay.init('pk_netpay_RZWqFZTckZHhIaTBzogznLReu')
      NetPay.setSandboxMode(true)
      function onPaymentSuccess(r) {
        window.ReactNativeWebView.postMessage(JSON.stringify(r))
      }

      function onPaymentError(r) {
        window.ReactNativeWebView.postMessage(JSON.stringify(r))
      }
    </script>
  </body>

  </html>`;

  return (
    <View style={{ flex: 1 }}>
      <Header item="Pago con Netpay" />
      <View style={{
        flex: 1,
      }}
      >
        <WebView
          originWhitelist={['*']}
          source={{
            uri:
            'https://solicitudes.migob.mx/pago-webview?cargos=121174771&total=720&tipo_de_padron=1&object_id_padron=531390&merchantReferenceCode=23010001421&webView=1',
          }}
          onMessage={onMessage}
        />
      </View>
    </View>
  );
};

export default NetpayPago;
