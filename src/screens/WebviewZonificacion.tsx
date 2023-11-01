// External dependencies
import React, { useState } from 'react';
import {
  View,
  Text,
} from 'react-native';

// Internal dependencies
import { WebView } from 'react-native-webview';

const WebViewZonificacionScreen = ({ route }) => {
  const { datos } = route;
  const [webViewResponse, setWebViewResponse] = useState(null);

  // Constants
  const htmlContent = `
  <!DOCTYPE html>
  <html>
      <head>
          <title>
              Prueba 3D-Secure 2.0
          </title>
          <meta http-equiv="content-type" content="text/html;charset=utf-8" />
          <script type="text/javascript" src="https://docs.netpay.mx/cdn/v1.3/netpay.min.js"></script>
          <script type="text/javascript" src="https://cdn.netpay.mx/js/dev/netpay3ds.js"></script>
      </head>
      <body>
          <div>
              <input id="card" type="text" placeholder="Card number" value="4000000000001091">
              <input id="expiry" type="text" placeholder="MM/YY" value="11/25">
              <input id="cvv" type="text" placeholder="CVV" value="123">
              <input id="amount" type="text" placeholder="Amount">
              <select id="email">
                  <option value="accept@netpay.com.mx" >accept@netpay.com.mx</option>
                  <option value="reject@netpay.com.mx" selected>reject@netpay.com.mx</option>
                  <option value="review@netpay.com.mx">review@netpay.com.mx</option>
                </select>
              <button id="payBtnCustomForm" onclick="begin3DSPaymentWithCustomForm()">Complete payment with custom form</button>
          </div>
          <script type="text/javascript">
          console = new Object();
          console.log = function(log) {
            window.webViewBridge.send("console", log);
          };
          console.debug = console.log;
          console.info = console.log;
          console.warn = console.log;
          console.error = console.log;
  let publicKey = 'pk_netpay_RZWqFZTckZHhIaTBzogznLReu';
  let secretKey = 'sk_netpay_EwFmccEWqoENmBBpAxcCyUoJrJBDytAcwOaufRJVpYhAy';
  document.getElementById('amount').value = Math.floor(Math.random() * 10000);
  
  console.log('NetPay - Public key: ', publicKey);
  console.log('NetPay - Secret key: ', secretKey);
  
  // IMPLEMENTATION TO DO IF YOURE GOING TO USE THE NETPAY'S DEFAULT PAYMENT FORM
  function begin3DSPaymentWithForm() {
  
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
  
          var monto =  parseFloat(document.getElementById('amount').value);
          let _this = this;
  
          // 3D-Secure initialization
          netpay3ds.setSandboxMode(true);
          netpay3ds.init(function () {
              netpay3ds.config(_this, monto, callback);
          });
  
          // Callback function executed when 3D-Secure initialization is done.
          const callback = function (_this, referenceId) {
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
          console.log('ReferenceId: ' + referenceId + 'token: ' + token + 'DeviceFingerPrint: ' + deviceFingerPrint);
  
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
              "description": "Cargo de prueba new custom",
              "paymentMethod": "card",
              "currency": "MXN",
              "billing": {
                  "firstName": "Jon",
                  "lastName": "Doe",
                  "email": document.getElementById('email').value,
                  "phone": "8190034544",
                  "merchantReferenceCode": "test-11124",
                  "address": {
                      "city": "Monterrey",
                      "country": "MX",
                      "postalCode": "65700",
                      "state": "Nuevo Leon",
                      "street1": "Filósofos 100",
                      "street2": "Tecnologico"
                  }
              },
              "ship": {
                  "city": "La Magdalena Contreras",
                  "country": "MX",
                  "firstName": "Juan Diego Correa",
                  "lastName": "",
                  "phoneNumber": "1234567890",
                  "postalCode": "10000",
                  "state": "Ciudad de México",
                  "street1": "Primera",
                  "street2": "Centro",
                  "shippingMethod": "flatrate_flatrate"
              },
              "redirect3dsUri": "http://example.com/",
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
                              console.log(result);
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
                      if (canProceed) {
                          console.log('NetPay - Running 3D-Secure 2.0 (challenge)');
                          const callbackProceed = function (_this, processorTransactionId, status) {
                              console.log('NetPay - ProcessorTransactionId: ', processorTransactionId);
  
                              // 3D-Secure (Success scenario with security code and rejected scenario with code)
                              if (status == 'success') { // this success status is the one we get from the verification process not from the charges service
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
                          alert(result.status);
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
  
      // STEP #1: Set the initial configuration of the netpay payment system
      let formTitle = "Pagar con NetPay";
      let paymentBtnText = "Completar Pago";
      NetPay.setApiKey(publicKey);
      NetPay.setSandboxMode(true);
      NetPay.form.generate("netpay-form", success, error, { title: formTitle, submitText: paymentBtnText });
  
  }
  
  // IMPLEMENTATION TO DO IF YOU'RE GOING TO USE YOUR CUSTOM PAYMENT FORM
  function begin3DSPaymentWithCustomForm() {
  
      // STEP #3: Collect the card data from the form (be sure that you collect the data securely in order to not getting any data loss)
      let card = document.getElementById('card').value;
      let expiryMonth = document.getElementById('expiry').value.split('/')[0];
      let expiryYear = document.getElementById('expiry').value.split('/')[1];
      let cvv = document.getElementById('cvv').value;
      let deviceFP = generateDeviceFingerPrint();
  
      let cardData = {
          cardNumber: card,
          expMonth: expiryMonth,
          expYear: expiryYear,
          cvv2: cvv,
          deviceFingerPrint: deviceFP
      };
  
      console.log('NetPay - Card Data:', cardData);
  
      var validateNumber = NetPay.card.validateNumber(cardData.cardNumber);
      var validateExpiry = NetPay.card.validateExpiry(cardData.expMonth, cardData.expYear);
      var validateCVV = NetPay.card.validateCVV(cardData.cvv2, cardData.cardNumber);
      var validateNumberLength = NetPay.card.validateNumberLength(cardData.cardNumber);
  
      if (!validateNumberLength || !validateNumber || !validateExpiry || !validateCVV) {
          alert("Please, verify the card information");
          return false;
      }
  
      console.log('NetPay - Card information validated... Card approved verification process.');
  
      // STEP #2: Create a function to generate the deviceFingerPrint we need for the charges service
      function generateDeviceFingerPrint() {
          console.log('NetPay - generatingDeviceFingerPrint')
          deviceFingerPrint = NetPay.form.generateDeviceFingerPrint();
          console.log('NetPay - DeviceFingerPrint: ', deviceFingerPrint);
          return deviceFingerPrint;
      }
  
      // STEP #4: Create a callback function that will receive the token from the netpay's payment form.
      function success(e) {
          var token = JSON.parse(e.message.data).token;
          console.log("NetPay - Creating Token");
          console.log("NetPay - Token: ", token);
  
          var monto = parseFloat(document.getElementById('amount').value); 
          let _this = this;
  
          // 3D-Secure initialization
          netpay3ds.setSandboxMode(true);
          netpay3ds.init(function () {
              netpay3ds.config(null, monto, callback);
          });
  
          // Callback function executed when 3D-Secure initialization is done.
          const callback = function (_this, referenceId) {
              console.log('NetPay - ReferenceId: ', referenceId);
              charges(referenceId, token, monto, deviceFP);
          }
      }
  
      // STEP #5: Create a callback function that will be executed when an error occur when trying to generate the token
      function error(e) {
          console.log("NetPay - Algo ha salido mal!");
          console.log(e);
      }
  
      // STEP #6: Create a function to execute charges service, this function must be called inside the success callback function after token generation
      function charges(referenceId, token, monto, deviceFingerPrint) {
          console.log('NetPay - Running charges endpoint');
  
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
              "description": "Cargo de prueba new custom",
              "paymentMethod": "card",
              "currency": "MXN",
              "billing": {
                  "firstName": 'abiel',
                  "lastName": 'robledo',
                  "email": document.getElementById('email').value,
                  "phone": "8190034544",
                  "merchantReferenceCode": "test-11124",
                  "address": {
                      "city": "Monterrey",
                      "country": "MX",
                      "postalCode": "65700",
                      "state": "Nuevo Leon",
                      "street1": "Filósofos 100",
                      "street2": "Tecnologico"
                  }
              },
              "ship": {
                  "city": "La Magdalena Contreras",
                  "country": "MX",
                  "firstName": "Juan Diego Correa",
                  "lastName": "",
                  "phoneNumber": "1234567890",
                  "postalCode": "10000",
                  "state": "Ciudad de México",
                  "street1": "Primera",
                  "street2": "Centro",
                  "shippingMethod": "flatrate_flatrate"
              },
              "redirect3dsUri": "http://example.com/",
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
                              console.log(result);
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
                      if (canProceed) {
                          console.log('NetPay - Running 3D-Secure 2.0 (challenge)');
                          const callbackProceed = function (_this, processorTransactionId, status) {
                              console.log('NetPay - ProcessorTransactionId: ', processorTransactionId);
  
                              // 3D-Secure (Success scenario with security code and rejected scenario with code)
                              if (status == 'success') { // this success status is the one we get from the verification process not from the charges service
                                  confirm(chargesResponse.transactionTokenId, processorTransactionId);
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
                          getTransactionDetails(chargesResponse.transactionTokenId)
                              .then(response => response.json())
                              .then(result => {
                                  console.log(result.status);
                                  if (result.status == 'WAIT_THREEDS') {
                                      confirm(chargesResponse.transactionTokenId, null);
                                  }
                                  else {
                                      alert('ELSE: ' + result.status);
                                  }
                              })
                              .catch(error => console.log('error', error));
                      }
                  }
  
              })
              .catch(error => console.log('error', error));
  
      }
  
      // STEP #7: Create a function to confirm transaction after 3D-Secure 2.0 process, this function must be called inside the 3D-Secure flow in charges function
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
                          alert(result.status);
                      })
                      .catch(error => console.log('error', error));
              })
              .catch(err => console.error(err));
      }
  
      // STEP #8: Create a function to execute transaction service to obtain the details and final status of the transactions after each flow, 
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
  
      // STEP #1: Set the initial configuration of the netpay payment system
      NetPay.setApiKey(publicKey);
      NetPay.setSandboxMode(true);
      NetPay.token.create(cardData, success, error);
  
  }
          </script>
          <div id="netpay-form">
  
          </div>
      <div style="text-align:right;position:fixed;z-index:9999999;bottom:0;width:auto;right:1%;cursor:pointer;line-height:0;display:block!important"><a title="Hosted on free web hosting 000webhost.com. Host your own website for FREE." target="_blank" href="https://www.000webhost.com/?utm_source=000webhostapp&utm_campaign=000_logo&utm_medium=website&utm_content=footer_img"><img src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png" alt="www.000webhost.com"></a></div><script>function getCookie(t){for(var e=t+"=",n=decodeURIComponent(document.cookie).split(";"),o=0;o<n.length;o++){for(var i=n[o];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(e))return i.substring(e.length,i.length)}return""}getCookie("hostinger")&&(document.cookie="hostinger=;expires=Thu, 01 Jan 1970 00:00:01 GMT;",location.reload());var wordpressAdminBody=document.getElementsByClassName("wp-admin")[0],notification=document.getElementsByClassName("notice notice-success is-dismissible"),hostingerLogo=document.getElementsByClassName("hlogo"),mainContent=document.getElementsByClassName("notice_content")[0];if(null!=wordpressAdminBody&&0<notification.length&&null!=mainContent){var googleFont=document.createElement("link");googleFontHref=document.createAttribute("href"),googleFontRel=document.createAttribute("rel"),googleFontHref.value="https://fonts.googleapis.com/css?family=Roboto:300,400,600,700",googleFontRel.value="stylesheet",googleFont.setAttributeNode(googleFontHref),googleFont.setAttributeNode(googleFontRel);var css="@media only screen and (max-width: 576px) {#main_content {max-width: 320px !important;} #main_content h1 {font-size: 30px !important;} #main_content h2 {font-size: 40px !important; margin: 20px 0 !important;} #main_content p {font-size: 14px !important;} #main_content .content-wrapper {text-align: center !important;}} @media only screen and (max-width: 781px) {#main_content {margin: auto; justify-content: center; max-width: 445px;}} @media only screen and (max-width: 1325px) {.web-hosting-90-off-image-wrapper {position: absolute; max-width: 95% !important;} .notice_content {justify-content: center;} .web-hosting-90-off-image {opacity: 1;}} @media only screen and (min-width: 769px) {.notice_content {justify-content: space-between;} #main_content {margin-left: 5%; max-width: 445px;} .web-hosting-90-off-image-wrapper {position: absolute; display: flex; justify-content: center; width: 50%; margin-left: 45%;}} .web-hosting-90-off-image {max-width: 90%;} .content-wrapper {min-height: 454px; display: flex; flex-direction: column; justify-content: center; z-index: 5} .notice_content {display: flex; align-items: center;} * {-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;} .upgrade_button_red_sale{box-shadow: 0 2px 4px 0 rgba(255, 69, 70, 0.2); width: 264px; border: 0; border-radius: 3px; background-color: #FF5C62 !important; padding: 15px 55px !important; font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 600; color: #ffffff;} .upgrade_button_red_sale:hover{color: #ffffff !important; background: #d10303 !important;}",style=document.createElement("style"),sheet=window.document.styleSheets[0];style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css)),document.getElementsByTagName("head")[0].appendChild(style),document.getElementsByTagName("head")[0].appendChild(googleFont);var button=document.getElementsByClassName("upgrade_button_red")[0],link=button.parentElement;link.setAttribute("href","https://www.hostinger.com/hosting-starter-offer?utm_source=000webhost&utm_medium=panel&utm_campaign=000-wp"),link.innerHTML='<button class="upgrade_button_red_sale">Claim Deal</button>',(notification=notification[0]).setAttribute("style","padding-bottom: 0; padding-top: 5px; background-color: #040713; background-size: cover; background-repeat: no-repeat; color: #ffffff; border-left-color: #040713;"),notification.className="notice notice-error is-dismissible";var mainContentHolder=document.getElementById("main_content");mainContentHolder.setAttribute("style","padding: 0;"),hostingerLogo[0].remove();var h1Tag=notification.getElementsByTagName("H1")[0];h1Tag.className="000-h1",h1Tag.innerHTML="Black Friday",h1Tag.setAttribute("style",'color: white; font-family: "Roboto", sans-serif; font-size: 48px; font-weight: 700;');var h2Tag=document.createElement("H2");h2Tag.innerHTML="Up to 90% off 4-year hosting plans + free domain, SSL & DDoS protection",h2Tag.setAttribute("style",'color: white; margin: 10px 0 15px 0; font-family: "Roboto", sans-serif; font-size: 16px; font-weight: 400; line-height: 1;'),h1Tag.parentNode.insertBefore(h2Tag,h1Tag.nextSibling);var paragraph=notification.getElementsByTagName("p")[0];paragraph.innerHTML="$<span style='font-size: 80px;'>2.49</span>/mo",paragraph.setAttribute("style",'font-family: "Roboto", sans-serif; font-size: 48px; font-weight: 700; margin: 0;');var list=notification.getElementsByTagName("UL")[0];list.remove();var org_html=mainContent.innerHTML,new_html='<div class="content-wrapper">'+mainContent.innerHTML+'</div><div class="web-hosting-90-off-image-wrapper"><img class="web-hosting-90-off-image" src="https://cdn.000webhost.com/000webhost/promotions/bf-2022-bottom-banner.png"></div>';mainContent.innerHTML=new_html;var saleImage=mainContent.getElementsByClassName("web-hosting-90-off-image")[0]}</script></body>
  </html>
  `;

  const handleMessage = (event) => {
    // const data = JSON.parse(event.nativeEvent.data);
    // console.log(data);
    console.log(event);
    // if (data.success) {
    //   setWebViewResponse(`Token creado correctamente: ${data.token}`);
    // } else {
    //   setWebViewResponse(`Algo ha salido mal! Error: ${data.error}`);
    // }
  };

  console.log(JSON.stringify(datos, null, 2));

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
      />

      <View style={{ flex: 1 }}>
        <Text>Respuesta del WebView:</Text>
        <Text>{webViewResponse}</Text>
      </View>

    </View>
  );
};

export default WebViewZonificacionScreen;
