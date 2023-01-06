import axios from 'axios';

const tokenizeAmount = async (total) => {
  let token;
  try {
    const response = await axios.post('https://gateway-154.netpaydev.com/gateway-ecommerce', {
      amount: total,
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: 'sk_netpay_PIMmYbNVYkIhsrMxSrxpcCFDOWmfadaKdkBBCNJuGgAnO',
        'Content-Type': 'application/json',
      },
    });
    token = response?.data?.tokenAmount;
  } catch (error) {
    // todo: do something
  }
  console.log(token);
  return token;
};

export { tokenizeAmount };
