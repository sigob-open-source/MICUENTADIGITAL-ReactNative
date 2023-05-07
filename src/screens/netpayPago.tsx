// External dependencies
import React, {
  useMemo,
  useState,
  useRef,
} from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WebViewMessageEvent } from 'react-native-webview';
import { ActivityIndicator, View } from 'react-native';

// Internal dependencies
import { RootStackParamList } from '../types/navigation';
import WebViewPage from '../components/WebViewPage';
import useDebouncedFunction from '../hooks/useDebouncedFunction';
import { useNotification } from '../components/DropDownAlertProvider';
import { INetPayResponse } from '../services/recaudacion/recibo.types';
import { generarTicket, generateRecibo } from '../services/recaudacion/recibo';
import Header from '../components/HeaderV2/Header';
import Logger from '../lib/logger';

// Types & Interfaces
type INetPayPagoScreen = NativeStackScreenProps<RootStackParamList, 'netpaypago'>;

interface FormLoadedMessage {
  message: 'checkout-form-loaded'
}

interface FormClosedMessage {
  message: 'checkout-form-closed',
}

interface FormGenericErrorMessage {
  message: 'checkout-form-declined',
}

interface FormPaymentSuccessMessage {
  message: 'checkout-form-success',
  data?: {
    affiliation: string;
    auth_code: string;
    bank_name: string;
    card_date: string;
    card_nature: string;
    card_number: string;
    card_type: string;
    eci: string;
    mrc: string;
    order_number: string;
    promotion: string;
    reference_number: string;
    status: string;
  }
}

interface NetPaySuccessMessage {
  message: 'netpay-response-success',
  data: INetPayResponse;
}

type WebViewMessage = FormLoadedMessage
| FormClosedMessage
| FormPaymentSuccessMessage
| FormGenericErrorMessage
| NetPaySuccessMessage;

const DETECT_MODAL = `
function findElementByTextContent(tagName = '*', text) {
  var elements = document.getElementsByTagName(tagName);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].textContent == text) {
      return elements[i];
    }
  }
  return null;
}

function findElementByAriaLabel(tagName = '*', label) {
  var elements = document.getElementsByTagName(tagName);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].getAttribute('aria-label') == label) {
      return elements[i];
    }
  }
  return null;
}

var formLoaded = false;
const findModalIntervalID = setInterval(() => {
  const form = findElementByTextContent('span', 'Información de Pago');

  if (form && !formLoaded) {
    formLoaded = true;
    clearInterval(findModalIntervalID);
    window.ReactNativeWebView.postMessage('{"message": "checkout-form-loaded"}');
  }
}, 500);

const getTransactionDetails = () => {
  const fields = Array
  .from(document.querySelectorAll('.info-data-success-container label[id]').values());

  if (!fields.length) return;

  return fields
    .reduce((acct, item) => { acct[item.id.replace('np-', '').replace('-', '_')] = item.textContent;return acct;}, {});
};

var paymentSucceed = false;

const findCloseButtonIntervalID = setInterval(() => {
  if (!formLoaded) return;

  const closeButton = findElementByAriaLabel('i', 'Close');

  if (closeButton) {
    clearInterval(findCloseButtonIntervalID);

    closeButton.addEventListener('click', () => {
      let message;
      if (paymentSucceed) {
        message = JSON.stringify({
          message: 'checkout-form-success',
          data: getTransactionDetails(),
        });
      } else {
        message = '{"message": "checkout-form-closed"}';
      }
      window.ReactNativeWebView.postMessage(message);
    });
  }
}, 500);

const emitNetPayResponse = () => {
  const prefix = localStorage.getItem('PAYMENT_TYPE');
  const netpayResponse = localStorage.getItem(prefix + '_response');

  try {
    const jsonData = JSON.parse(netpayResponse);

    const message = JSON.stringify({
      message: 'netpay-response-success',
      data: jsonData,
    });

    window.ReactNativeWebView.postMessage(message);
  } catch {

  }
};

const cardPaymentSuccessIntervalId = setInterval(() => {
  if (!formLoaded) return;

  const form = document.getElementById('success-card-payment-container');
  if (getComputedStyle(form).display === 'none') return;

  const finishButton = document.querySelector('a#np-card-finish');

  if (finishButton) {
    paymentSucceed = true;
    clearInterval(cardPaymentSuccessIntervalId);

    emitNetPayResponse();

    finishButton.addEventListener('click', () => {
      const message = JSON.stringify({
        message: 'checkout-form-success',
        data: getTransactionDetails(),
      });
      window.ReactNativeWebView.postMessage(message);
    });
  }
}, 500);

const cashPaymentSuccessIntervalId = setInterval(() => {
  if (!formLoaded) return;

  const form = document.getElementById('success-cash-payment-container');
  if (getComputedStyle(form).display === 'none') return;

  const finishButton = document.querySelector('a#np-cash-finish');

  if (finishButton) {
    paymentSucceed = true;
    clearInterval(cashPaymentSuccessIntervalId);
    
    finishButton.addEventListener('click', () => {
      const message = JSON.stringify({
        message: 'checkout-form-success',
      });
      window.ReactNativeWebView.postMessage(message);
    });
  }
}, 500);

const findGenericErrorIntervalId = setInterval(() => {
  if (!formLoaded) return;

  const form = document.getElementById('generic-error-container');
  if (getComputedStyle(form).display === 'none') return;
  
  const errorElement = document.getElementById('close-generic-error');
  if (errorElement) {
    clearInterval(findGenericErrorIntervalId);

    errorElement.addEventListener('click', () => {
      window.ReactNativeWebView.postMessage('{"message": "checkout-form-declined"}');
    });
  }
}, 500);

const findPaymentErrorIntervalId = setInterval(() => {
  if (!formLoaded) return;

  const form = document.getElementById('error-payment-container');
  if (getComputedStyle(form).display === 'none') return;
  
  const errorElement = document.getElementById('close-error');
  if (errorElement) {
    clearInterval(findPaymentErrorIntervalId);

    errorElement.addEventListener('click', () => {
      window.ReactNativeWebView.postMessage('{"message": "checkout-form-declined"}');
    });
  }
}, 500);

`;

const NetPayPagoScreen = ({
  navigation,
  route: {
    params: {
      cargoIds,
      padronId,
      tipoDePadronId,
      total,
      merchantReferenceCode,
    },
  },
}: INetPayPagoScreen) => {
  // Refs
  const webViewRef = useRef<React.ElementRef<typeof WebViewPage> | null>(null);

  // Component's state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNetPayFormLoaded] = useState<boolean>(false);
  const [netPayResponse, setNetPayResponse] = useState<INetPayResponse | null>(null);
  const [loadingRecibo, setLoadingRecibo] = useState<boolean>(false);

  const notify = useNotification();

  const URI = useMemo(() => {
    const ids = cargoIds.join(',');

    return `https://solicitudes.migob.mx/pago-webview?cargos=${ids}&total=${total}&tipo_de_padron=${tipoDePadronId}&object_id_padron=${padronId}&merchantReferenceCode=${merchantReferenceCode}&webView=1`;
  }, [
    cargoIds,
    total,
    tipoDePadronId,
    padronId,
    merchantReferenceCode,
  ]);

  console.log({ URI });

  const onNetPayFormLoaded = useDebouncedFunction(() => {
    setNetPayFormLoaded(true);
  }, 700);

  const onNetPayCloseForm = useDebouncedFunction(() => {
    navigation.goBack();
  }, 700);

  const getReceipt = async () => {
    if (!netPayResponse) return;

    setLoadingRecibo(true);

    const { success, result } = await generateRecibo({
      canal_de_pago: 3,
      folio: merchantReferenceCode,
      response: netPayResponse,
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
      return;
    }

    notify({
      type: 'error',
      title: 'Error',
      message: 'No logramos guardar su pago, favor de reportar en ventanilla',
    });

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'menuInicio',
        },
      ],
    });
  };

  const onFormSuccess = useDebouncedFunction(() => {
    void getReceipt();
  }, 700);

  const onFormError = useDebouncedFunction(() => {
    notify({
      type: 'warn',
      title: 'Error',
      message: 'No se pudo procesar su pago',
    });

    navigation.goBack();
  }, 700);

  const onMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data) as WebViewMessage;

      switch (data.message) {
        case 'checkout-form-closed':
          onNetPayCloseForm();
          break;
        case 'checkout-form-loaded':
          onNetPayFormLoaded();
          break;
        case 'checkout-form-success':
          onFormSuccess();
          break;
        case 'checkout-form-declined':
          onFormError();
          break;
        case 'netpay-response-success':
          if (data.data) {
            setNetPayResponse(data.data);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      const typedError = error as Error;

      Logger.error({
        event: 'web view error',
        key: 'parse error',
        error: typedError,
        source: 'netpayPago.tsx',
        message: typedError?.message,
      });
    }
  };

  if (loadingRecibo) {
    return (
      <>
        <Header
          title="Pago con NetPay"
        />

        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator
            size="large"
            color="#010101"
          />
        </View>
      </>
    );
  }

  return (
    <WebViewPage
      ref={webViewRef}
      title="Pago con NetPay"
      uri={URI}
      injectedJavaScript={DETECT_MODAL}
      onMessage={onMessage}
    />
  );
};

export default NetPayPagoScreen;
