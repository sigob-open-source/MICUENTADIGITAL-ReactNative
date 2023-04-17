import axios from 'axios';
import Logger from '../lib/logger';

interface ITokenizeAmountResponse {
  clientId: number;
  storeId: number;
  tokenAmount: string;
  amount: number;
}

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

export { tokenizeAmount };
