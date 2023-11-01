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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NetPay Test</title>
</head>
<body>
<div id="netpay-form"></div>

<script src="https://docs.netpay.mx/cdn/v1.3/netpay.min.js"></script>
<script src="https://cdn.netpay.mx/js/dev/netpay3ds.js"></script>
<script>

        let publicKey = 'PUBLIC_API_KEY';//pk_netpay_#####################'; //
        let secretKey = 'AUTHORIZATIONKEY'; //sk_netpay_$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$';

        let formTitle = "Pagar Abiel Robledo";
        let paymentBtnText = "Completar Pago NetPay2";

         // VARIABLES QUE SE RETRAEN DEL FORMULARIO PREVIO, (AQUI CAMBIAR)..
         let nombre = "";
         let apellido = "";
         let telefono = "";
         let referencia = "";
         let ciudad = "Juarez";
         let estado = "Chihuahua";
         let codigoPostal = "32472";
         let calle1 = "Ave. Campos Eliseos 9345";
         let calle2 = "Fracc. Campos Eliseos";

         let transactionTokenId
  
            
        // PASO #1: CONFIGURACION INICIAL
       
        NetPay.setApiKey(publicKey);
        NetPay.setSandboxMode(true);
        NetPay.form.generate("netpay-form", success, error, { title: formTitle, submitText: paymentBtnText });
        

        // STEP #2: Create a function to generate the deviceFingerPrint we need for the charges service
            function generateDeviceFingerPrint() {
                console.log('NetPay - generatingDeviceFingerPrint')
                deviceFingerPrint = NetPay.form.generateDeviceFingerPrint();
                console.log('NetPay - DeviceFingerPrint: ', deviceFingerPrint);
                return deviceFingerPrint;
            }

            // STEP #3: Create a callback function that will receive the token from the netpay's payment form.
            function success(e) {
                var token = JSON.parse(e.message.data).token;
                console.log("NetPay - Creating Token");
                console.log("NetPay - Token: ", token);

                var monto =  ""; // EL MONTO DEL FORMULARIO
                let _this = this;
            
                // 3D-Secure initialization
                netpay3ds.setSandboxMode(true);
                netpay3ds.init(function () {
                    netpay3ds.config(_this, monto, callback);
                });

                // Callback function executed when 3D-Secure initialization is done.
                const callback = function(_this, referenceId) {
                    console.log('NetPay - ReferenceId: ', referenceId);
                    charges(referenceId, token, monto, generateDeviceFingerPrint());
                }
            }

            // STEP #4: Create a callback function that will be executed when an error occur when trying to generate the token
            function error(e) {
                console.log("NetPay - Algo ha salido mal!");
                console.log(e);
            }
            
            // STEP #5: Create a function to execute charges service, this function must be called inside the success callback function after token generation
            function charges(referenceId, token, monto, deviceFingerPrint) {
                console.log('NetPay - Running charges endpoint');
                console.log('ReferenceId: ' + referenceId + '\nToken: ' + token + '\nDeviceFingerPrint: ' + deviceFingerPrint);

                // HEADERS
                var myHeaders = new Headers();
                myHeaders.append("authorization", secretKey);
                myHeaders.append("Content-Type", "application/json");
                // BODY
                var raw = JSON.stringify({
                "amount": monto,
                "sessionId": deviceFingerPrint,
                "deviceFingerPrint": deviceFingerPrint,
                "referenceID": referenceId,
                "source": token,
                "description": "Cargo de prueba SIGOB",
                "paymentMethod": "card",
                "currency": "MXN",
                "billing": {
                    "firstName": nombre,
                    "lastName": apellido,
                    "email": "review@netpay.com.mx",
                    "phone": telefono,
                    "merchantReferenceCode": referencia,
                    "address": {
                    "city": ciudad,
                    "country": "MX",
                    "postalCode": codigoPostal,
                    "state": estado,
                    "street1": calle1,
                    "street2": calle2
                    }
                },
                "redirect3dsUri": "NA",
                "saveCard": false
                });
                
                 // LOGS
                console.log('NetPay - Charges payload:', JSON.parse(raw));

                // REQUEST OPTIONS
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                // EXECUTING REQUEST
                fetch("https://gateway-154.netpaydev.com/gateway-ecommerce/v3.5/charges", requestOptions)
                .then(response => response.text())
                .then(result => {
                    var chargesResponse = JSON.parse(result);
                    console.log('NetPay - Charges Result: ', chargesResponse);

                    // Normal success flow and normal rejected flow
                    if (chargesResponse.status != "review") {
                        getTransactionDetails(chargesResponse.transactionTokenId)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result.status);
                            alert(result.status);
                        })
                        .catch(error => console.log('error', error));
                    }
                    // 3D-Secure Flow
                    else {
                        console.log('NetPay - Charges Response Status: ', chargesResponse.status);
                        console.log('NetPay - Charges Response ThreeDSecureResponse responseCode: ', chargesResponse.threeDSecureResponse.responseCode);
                        console.log('NetPay - Charges Response ThreeDSecureResponse acsUrl: ', chargesResponse.threeDSecureResponse.acsUrl);

                        let canProceed = netpay3ds.canProceed(
                            chargesResponse.status, 
                            chargesResponse.threeDSecureResponse.responseCode, 
                            chargesResponse.threeDSecureResponse.acsUrl);

                        console.log('NetPay - CanProceed Result: ', canProceed);
                        if(canProceed) {
                            console.log('NetPay - Running 3D-Secure 2.0 (challenge)');
                            const callbackProceed = function(_this, processorTransactionId, status) {
                                console.log('NetPay - ProcessorTransactionId: ', processorTransactionId);
                                
                                // 3D-Secure (Success scenario with security code and rejected scenario with code)
                                if(status == 'success') { // this success status is the one we get from the verification process not from the charges service
                                    getTransactionDetails(transactionTokenId)
                                    .then(response => response.json())
                                    .then(result => {
                                        console.log(result);
                                        console.log(result.status);
                                        confirm(chargesResponse.transactionTokenId, processorTransactionId);
                                    })
                                    .catch(error => console.log('error', error));
                                }
                            }

                            netpay3ds.proceed(
                                this, 
                                chargesResponse.threeDSecureResponse.acsUrl, 
                                chargesResponse.threeDSecureResponse.paReq, 
                                chargesResponse.threeDSecureResponse.authenticationTransactionID, 
                                callbackProceed);
                        }
                        else {
                             // 3D-Secure Frictionless (success and reject) scenario without security code
                            console.log('NetPay - Running 3D-Secure 2.0 (frictionless)');
                            console.log("NetPay - Confirming transaction");
                            var transactionStatus = getTransactionDetails(chargesResponse.transactionTokenId)
                                .then(response => response.json())
                                .then(result => {
                                    console.log(result.status);
                                    if (result.status == 'WAIT_THREEDS') {
                                        confirm(chargesResponse.transactionTokenId, null);
                                    }
                                    else {
                                        alert(result.status);
                                    }
                                })
                                .catch(error => console.log('error', error));
                        }
                    }

                })
                .catch(error => console.log('error', error));
                
            }

            // STEP #6: Create a function to confirm transaction after 3D-Secure 2.0 process, this function must be called inside the 3D-Secure flow in charges function
            function confirm(transactionTokenId, processorTransactionId) {
                console.log('NetPay - Confirming transaction');
                const options = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        Authorization: secretKey,
                        'Content-Type': 'application/json'
                    }
                };

                 fetch('https://gateway-154.netpaydev.com/gateway-ecommerce/v3.5/charges/' + transactionTokenId + '/confirm?processorTransactionId=' + processorTransactionId, options)
                .then(response => response.json())
                .then(response => {
                    console.log('NetPay - Confimed transaction with result: ', response);
                    getTransactionDetails(transactionTokenId)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                            console.log(result.status);
                            alert(transactionTokenId);
                            alert(result.status);
                            window.location.href = "event://DONE?data=" + encodeURIComponent(JSON.stringify(result.status));
                        })
                        .catch(error => console.log('error', error));
                })
                .catch(err => console.error(err));
            }
            
            // STEP #7: Create a function to execute transaction service to obtain the details and final status of the transactions after each flow, 
            // this function must be called in the charges function and inside the confirm function
            function getTransactionDetails(transactionTokenId) {
                console.log('NetPay - Getting transaction details');
                var myHeaders = new Headers();
                myHeaders.append("authorization", secretKey);
                
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                console.log('NetPay - TransactionTokenId: ', transactionTokenId);
                return fetch("https://gateway-154.netpaydev.com/gateway-ecommerce/v3/transactions/" + transactionTokenId, requestOptions);
            }
                                
          
</script>
</body>
</HTML>`;

  // funcion activada al dar al boton realizar pago del formulario netpay

  return (

    <View style={styles.container}>
      <Header style={styles.header} item="Netpay" />

      <View style={{ width: '100%', height: '100%' }}>
        <WebView
          source={{ html }}
        />

      </View>

    </View>

  );
};

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
    width: '100%',
    height: '100%',
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
