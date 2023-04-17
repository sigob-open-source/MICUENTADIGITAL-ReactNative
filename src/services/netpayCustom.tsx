import axios from 'axios';
import netpayCDN from './netpayCDN';

// Realiza pago por medio de netpay con datos de tarjeta
const Payment = async (amount: number, cardToken: string, firstName?: string, lastName?: string): Promise<any> => {
  const body = JSON.stringify({
    amount,
    description: 'Cargo de prueba new custom',
    paymentMethod: 'card',
    source: cardToken,
    currency: 'MXN',
    billing: {
      firstName: firstName || 'John',
      lastName: lastName || 'Doe',
      email: 'accept@netpay.com.mx',
      phone: '8190034544',
      merchantReferenceCode: 'test-11124',
      address: {
        city: 'Monterrey',
        country: 'MX',
        postalCode: '65700',
        state: 'Nuevo Leon',
        street1: 'Filósofos 100',
        street2: 'Tecnologico',
      },
    },
    redirect3dsUri: 'http://example.com/',
    saveCard: false,
  });
  try {
    const response = await axios.post('https://gateway-154.netpaydev.com/gateway-ecommerce/v3/charges', body, {
      headers: {
        Accept: 'application/json',
        Authorization: 'sk_netpay_fPENSUJIzhduvwQMZqBkUzdtotRnKHDrjxjHXluBmcJFR',
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response);
    console.log(error.result);
    console.log(error.data);
  }
};

export {
  Payment,
};
