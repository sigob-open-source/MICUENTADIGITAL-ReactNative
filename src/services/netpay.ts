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
  folioNet: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
) => {
  console.log('este es el metodo de pago', total, token, folioNet, firstName, lastName, email, phone);
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
        firstName: 'KARINA',
        lastName: 'MONROY',
        email: 'karina.monroy@hotmail.com',
        phone: '6531364602',
        merchantReferenceCode: folioNet,
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
    return response.data;
  } catch (error) {
    console.log(error);
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

export { tokenizeAmount, createCharge };
