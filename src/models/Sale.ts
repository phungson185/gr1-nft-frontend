export type PaymentTokenType = {
  id: string;
  symbol: string;
  contractAddress: string;
};

export type SaleType = {
  id: string;
  price: number;
  cancelled: boolean;
  paymentTokenId: string;
  paymentToken: PaymentTokenType;
};
