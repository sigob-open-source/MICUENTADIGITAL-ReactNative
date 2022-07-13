import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  StyleSheet, Text, View, TextInput, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import { Payment, TokenizeCard } from '../services/netpayCustom';
import fonts from '../utils/fonts';
import { getRecibos } from '../services/padrones';

const NetpayCustom = ({ route }) => {
  // const [numeroTarjeta, setNumeroTarjeta] = useState<string>('');
  // const [nombre, setNombre] = useState<string>('');
  // const [apellido, setApellido] = useState<string>('');
  // const [mes, setMes] = useState<string>('');
  // const [anio, setAnio] = useState<string>('');
  // const [cvv, setCvv] = useState<string>('');

  const navigation = useNavigation();

  // Funcion para realizar pago con formulario personalizado
  // const doPayment = async () => {
  //   const { amount } = route.params;
  //   const tokenCard:string = await TokenizeCard(numeroTarjeta, mes, anio, cvv);
  //   const paymentResponse = await Payment(amount, tokenCard, nombre, apellido);
  // };

  // html con formulario default de netpay para tokenizar la tarjeta
  // window.ReactNativeWebView.postMessage es el valor que retorna el html en la funcion onMessage
  const html = `
<!DOCTYPE html>
<html>

<head>
  <title>NetPay.js</title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
  <script type="text/javascript" src="https://docs.netpay.mx/cdn/js/dev/netpay.154.js"></script>

</head>

<body style="padding: 50px;">
  <div id="netpay-form"></div>
  <script>
    NetPay.setApiKey("pk_netpay_uppwsWcVEwjcMTKhExsKENZif");
    NetPay.setSandboxMode(true);

    function success(e) {
      window.ReactNativeWebView.postMessage(e.message.data);
      console.log("Token created successfully");
      console.log(e);
    }

    function error(e) {
      window.ReactNativeWebView.postMessage('Something went wrong');
      console.log("Something went wrong!");
      console.log(e);
    }

    NetPay.form.generate("netpay-form", success, error, {
      title: "",
      submitText: ""
    });
  </script>
</body>

</html>`;

  // funcion activada al dar al boton realizar pago del formulario netpay
  const onMessage = async (event) => {
    // console.log(event.nativeEvent.data);
    if (event.nativeEvent.data) {
      const { data } = event.nativeEvent;
      const {
        amount, padron_id, cargos, tipo_de_padron,
      } = route.params;
      let token = '';
      for (let x = 10; data[x] !== '"'; x++) {
        token += data[x];
      }
      console.log(token);
      const response = await Payment(amount, token);
      console.log(response);
      if (!response) {
        navigation.navigate('pagoRealizado', { message: 'Problema en la transaccion' });
      }
      if (response.status === 'success') {
        getRecibos(amount, cargos, padron_id, tipo_de_padron);
        navigation.navigate('pagoRealizado', { message: 'Transaccion Hecha Satisfactoriamente' });
      } else {
        console.log('error');
      }
    }
  };

  return (

    <View style={styles.container}>
      <Header style={styles.header} item="Netpay Custom" />

      <View style={{ flex: 1, paddingTop: 70 }}>
        <WebView source={{ html }} onMessage={onMessage} />
      </View>

    </View>

  );
};

// formulario personalizado
{ /* <Text style={styles.label}>Numero de Tarjeta</Text>
          <TextInput color="black" maxLength={16} keyboardType="numeric" onChangeText={(text) => setNumeroTarjeta(text)} placeholderTextColor="#C4C4C4" style={styles.textInputStyle} placeholder="XXXXXXXXXXXXXXXX" />
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Nombre</Text>
              <TextInput color="black" placeholderTextColor="#C4C4C4" onChangeText={(text) => setNombre(text)} style={styles.textInputStyleRowTwo} placeholder="Ej. Alfredo" />
            </View>
            <View>
              <Text style={styles.label}>Apellido</Text>
              <TextInput color="black" placeholderTextColor="#C4C4C4" onChangeText={(text) => setApellido(text)} style={styles.textInputStyleRowTwo} placeholder="Ej. Reyes" />
            </View>

          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Mes</Text>
              <TextInput color="black" maxLength={2} keyboardType="numeric" onChangeText={(text) => setMes(text)} placeholderTextColor="#C4C4C4" style={styles.textInputStyleRow} placeholder="XX" />
            </View>
            <View>
              <Text style={styles.label}>Año</Text>
              <TextInput color="black" maxLength={2} keyboardType="numeric" onChangeText={(text) => setAnio(text)} placeholderTextColor="#C4C4C4" style={styles.textInputStyleRow} placeholder="XX" />
            </View>
            <View>
              <Text style={styles.label}>CVV</Text>
              <TextInput color="black" maxLength={3} keyboardType="numeric" onChangeText={(text) => setCvv(text)} placeholderTextColor="#C4C4C4" style={styles.textInputStyleRow} placeholder="XXX" />
            </View>
          </View>
          <TouchableWithoutFeedback onPress={doPayment}>
            <View style={styles.buttonPrint}>
              <Text style={styles.textButton}>Realizar Pago</Text>
            </View>
          </TouchableWithoutFeedback> */ }

export default NetpayCustom;

const styles = StyleSheet.create({
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
  textButton: {
    color: 'white',
    fontFamily: fonts.bold,
    fontSize: 20,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    height: '100%',
    fontSize: 13,
    marginBottom: 15,
    marginTop: 5,
    width: '100%',
    height: 46,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  textInputStyleRow: {
    height: '100%',
    fontSize: 13,
    marginBottom: 15,
    marginTop: 5,
    width: Dimensions.get('window').width * 0.28,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  textInputStyleRowTwo: {
    height: '100%',
    fontSize: 13,
    marginBottom: 15,
    marginTop: 5,
    width: Dimensions.get('window').width * 0.43,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
});
