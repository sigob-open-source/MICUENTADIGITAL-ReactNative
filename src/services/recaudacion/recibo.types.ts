interface ITransactionDto {
  status: string;
  createdAt?: unknown;
  timeOut: string;
  orderId: string;
  merchantReferenceCode: string;
  spanRouteNumber: string;
  authCode: string;
  bankName: string;
  cardNature: string;
  merchantId?: unknown;
  promotion: string;
  eci: string;
  transactionTokenId: string;
  storeName?: unknown;
  responseCode: string;
}

interface ICard {
  token: string;
  expYear: string;
  expMonth: string;
  lastFourDigits: string;
  cardHolderName: string;
  brand: string;
  deviceFingerPrint: string;
  bank: string;
  type: string;
  country: string;
  scheme: string;
  cardPrefix: string;
  preAuth: boolean;
  vault: boolean;
  simpleUse: boolean;
}

interface IPaymentSource {
  cardDefault: boolean;
  card: ICard;
  source: string;
  type: string;
}

interface IAddress {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street1: string;
  street2?: unknown;
}

interface IBilling {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ipAddress?: unknown;
  merchantReferenceCode: string;
  address: IAddress;
}

interface INetPayResponse {
  amount: number;
  description?: unknown;
  status: string;
  redirect3dsUri: string;
  returnUrl?: unknown;
  paymentMethod: string;
  currency: string;
  createdAt: string;
  error?: unknown;
  transactionDto: ITransactionDto;
  reason?: unknown;
  responseMsg?: unknown;
  paymentSource: IPaymentSource;
  billing: IBilling;
  threeDSecure?: unknown;
}

interface IBase64File {
  id: number;
  name: string;
  ext: string;
  data: string;
}

export type {
  IBase64File,
  ITransactionDto,
  ICard,
  IPaymentSource,
  IAddress,
  IBilling,
  INetPayResponse,
};
