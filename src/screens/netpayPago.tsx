import {
  StyleSheet, Text, View, ViewPropTypes,
} from 'react-native';
import React from 'react';

import { WebView } from 'react-native-webview';
import Header from '../components/Header';

const netpayPago = ({ route: { params: { responseNetpay } } }) => {
  const html = `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>Getting Started</title>
</head>

<body>
  <div style="visibility: hidden;">
    <button style="display: none !important;" id='netpay-checkout' data-street1='Filosofos 100' data-country='Mexico'
      data-city='Monterrey' data-postal-code='64700' data-state='Nuevo Leon'
      data-token=${responseNetpay} data-phone-number='8110000000'
      data-email='accept@netpay.com.mx' data-merchant-reference-code='77777777' data-onsuccess='onPaymentSuccess'
      data-onerror='onPaymentError' data-product-count='2' data-commerce-name='Netpay Sandbox'>Pagar</button>
  </div>
  <script src="https://docs.netpay.mx/cdn/js/latest/checkout.plus.dev.js"></script>
  <script>
    window.onload = () => {
      const btn = document.getElementById('netpay-checkout');
      btn.click();
    }
    NetPay.init('pk_netpay_uppwsWcVEwjcMTKhExsKENZif')
    NetPay.setSandboxMode(true)
    function onPaymentSuccess(r) {
      console.log('Success!', r)
    }

    function onPaymentError(r) {
      console.log('Error!', r)
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
          source={{ html }}
        />
      </View>
    </View>
  );
};

export default netpayPago;

const styles = StyleSheet.create({});
