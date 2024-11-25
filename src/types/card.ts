type PaymentCardType = {
  id: string;
  card_number: string;
  cardholder_name: string;
  expired_date: string;
  ccv: number;
  is_primary: boolean;
};

export type { PaymentCardType };
