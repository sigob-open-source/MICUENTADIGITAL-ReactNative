// External dependencies
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';

// Internal dependencies
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WebViewMessageEvent } from 'react-native-webview';
import { RootStackParamList } from '../types/navigation';
import { useAppSelector } from '../store-v2/hooks';
import { CargoProps } from '../services/recaudacion/generar-cargos.types';
import useTotal from '../hooks/useTotal';
import WebViewPage from '../components/WebViewPage';
import Logger from '../lib/logger';
import useDebouncedFunction from '../hooks/useDebouncedFunction';
import { useNotification } from '../components/DropDownAlertProvider';

// Types & Interfaces
type NetPayPagoScreen = NativeStackScreenProps<RootStackParamList, 'netpaypago'>;

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

type WebViewMessage = FormLoadedMessage
| FormClosedMessage
| FormPaymentSuccessMessage
| FormGenericErrorMessage;

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

const cardPaymentSuccessIntervalId = setInterval(() => {
  if (!formLoaded) return;

  const form = document.getElementById('success-card-payment-container');
  if (getComputedStyle(form).display === 'none') return;

  const finishButton = document.querySelector('a#np-card-finish');

  if (finishButton) {
    paymentSucceed = true;
    clearInterval(cardPaymentSuccessIntervalId);

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

const NetpayPago = ({
  navigation,
  route: {
    params: { merchantReferenceCode },
  },
}: NetPayPagoScreen) => {
  // Refs
  const webViewRef = useRef<React.ElementRef<typeof WebViewPage> | null>(null);

  // Component's state
  const [netpayFormLoaded, setNetpayFormLoaded] = useState<boolean>(false);
  const pagosDiversos = useAppSelector((state) => state.pagosDiversos);

  const notify = useNotification();

  const flatCargos = useMemo(() => pagosDiversos.cargos.reduce((acc, item) => {
    acc.push(item[0], ...item[1].cargos_hijos);
    return acc;
  }, [] as CargoProps[]), [pagosDiversos.cargos]);

  const importes = useMemo(
    () => flatCargos.map((item) => item.importe),
    [flatCargos],
  );

  const { roundedTotal } = useTotal({ importes });

  const URI = useMemo(() => {
    const cargoIds = flatCargos.map((cargo) => cargo.id).join(',');

    return `https://solicitudes.migob.mx/pago-webview?cargos=${cargoIds}&total=${roundedTotal}&tipo_de_padron=${pagosDiversos.tipoDePadron!.id}&object_id_padron=${pagosDiversos.padron!.id}&merchantReferenceCode=${merchantReferenceCode}&webView=1`;
  }, [
    flatCargos,
    roundedTotal,
    pagosDiversos.tipoDePadron,
    pagosDiversos.padron,
    merchantReferenceCode,
  ]);

  const onNetPayFormLoaded = useDebouncedFunction(() => {
    setNetpayFormLoaded(true);
  }, 700);

  const onNetPayCloseForm = useDebouncedFunction(() => {
    navigation.goBack();
  }, 700);

  const onFormSuccess = useDebouncedFunction(() => {
    notify({
      type: 'success',
      title: '¡Éxito!',
      message: 'Pago existoso',
    });

    navigation.reset({
      index: 0,
      routes: [{
        name: 'menuInicio',
      }],
    });
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

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!netpayFormLoaded) {
      timeout = setTimeout(() => {
        webViewRef.current?.reload();
        setNetpayFormLoaded(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [netpayFormLoaded]);

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

export default NetpayPago;
