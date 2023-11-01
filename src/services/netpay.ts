import axios from 'axios';
import Logger from '../lib/logger';

interface ITokenizeAmountResponse {
  clientId: number;
  storeId: number;
  tokenAmount: string;
  amount: number;
}

const createCharge = async (
  total: number,
  token: string,
  dataUser,
) => {
  console.log('este es el metodo de pago', JSON.stringify(token, null, 2));
  console.log('datauser', JSON.stringify(dataUser, null, 2));

  const nowTime = new Date().getTime();
  try {
    // const response = await axios.post('https://suite.netpay.com.mx/gateway-ecommerce/v3.5/charges', {
    const response = await axios.post('https://gateway-154.netpaydev.com/gateway-ecommerce/v3.5/charges', {
      transactionType: 'Auth',
      amount: total,
      source: token.token,
      description: 'Cargo de prueba',
      paymentMethod: 'card',
      sessionId: '1668110282365',
      deviceFingerPrint: '1668110282365',
      currency: 'MXN',
      billing: {
        firstName: dataUser.nombre,
        lastName: dataUser.apellidoPaterno,
        email: dataUser.email,
        phone: dataUser.celular,
        merchantReferenceCode: nowTime,
        address: {
          city: 'CD. JUAREZ',
          country: 'MX',
          postalCode: '32000',
          state: 'NL',
          street1: 'Humberto Junco Voigt, México 2307-2o Sector, Santa Engracia',
        },
      },
      redirect3dsUri: 'http://example.com/',
      saveCard: 'false',
      referenceID: 166811049,
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: 'sk_netpay_EwFmccEWqoENmBBpAxcCyUoJrJBDytAcwOaufRJVpYhAy',
        // Authorization: 'sk_netpay_PIMmYbNVYkIhsrMxSrxpcCFDOWmfadaKdkBBCNJuGgAnO',
        'Content-Type': 'application/json',
      },
    });
    // console.log('respues de netpay', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.log('error de netpay Proceso de pago', JSON.stringify(error, null, 2));

    console.log('Error de netpay en el proceso de pago:');
    console.log('Tipo de error:', error.name);
    console.log('Mensaje de error:', error.message);

    // Si el error tiene detalles adicionales específicos, puedes mostrarlos
    if (error.response) {
      console.log('Respuesta de error:', JSON.stringify(error.response.data, null, 2));
      console.log('Código de estado:', error.response.status);
    }

    // También puedes mostrar la pila de llamadas para rastrear la ubicación del error
    console.log('Pila de llamadas:', error.stack);
    return false;
  }
};

const detallesDePago = async (
  transactionTokenId: string,
) => {
  console.log('transactionTokenI: ', JSON.stringify(transactionTokenId, null, 2));
  try {
    // const response = await axios.get(`https://suite.netpay.com.mx/gateway-ecommerce/v3/transactions/${transactionTokenId}`, {
    const response = await axios.get(`https://gateway-154.netpaydev.com/gateway-ecommerce/v3/transactions/${transactionTokenId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'sk_netpay_EwFmccEWqoENmBBpAxcCyUoJrJBDytAcwOaufRJVpYhAy',
        // Authorization: 'sk_netpay_PIMmYbNVYkIhsrMxSrxpcCFDOWmfadaKdkBBCNJuGgAnO',
        'Content-Type': 'application/json',
      },
    });
    // console.log('respues de netpay', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    // console.log('error de netpay', JSON.stringify(error, null, 2));
    if (error.response) {
      console.log('Respuesta de error detalle pago:', JSON.stringify(error.response.data, null, 2));
      console.log('Código de estado:', error.response.status);
    }

    return false;
  }
};

const tokenizeAmount = async (total: number) => {
  let token: string | null = null;

  try {
    const response = await axios.post<ITokenizeAmountResponse>('https://gateway-154.netpaydev.com/gateway-ecommerce/v3/token/amount', {
      amount: total,
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: 'sk_netpay_EwFmccEWqoENmBBpAxcCyUoJrJBDytAcwOaufRJVpYhAy',
        'Content-Type': 'application/json',
      },
    });

    token = response?.data?.tokenAmount || null;
  } catch (error) {
    const typedError = error as Error;

    Logger.error({
      event: 'api error',
      message: typedError?.message,
      source: 'netpay.ts',
      error: typedError,
    });
  }

  return token;
};

export { tokenizeAmount, createCharge, detallesDePago };
