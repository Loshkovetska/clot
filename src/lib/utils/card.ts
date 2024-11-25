export const detectCardType = (value: string) => {
  if (/^4[0-9]{12}(?:[0-9]{3})?$/g.test(value)) {
    return "Visa";
  }

  if (/^5[1-5][0-9]{14}$/g.test(value)) {
    return "MasterCard";
  }

  if (/^3[47][0-9]{13}$/g.test(value)) {
    return "Amex";
  }

  if (/^6(?:011|5[0-9]{2}|[4-9][0-9]{2})[0-9]{12}$/g.test(value)) {
    return "Discover";
  }

  if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/g.test(value)) {
    return "Dinners_Club";
  }

  if (/^(?:2131|1800|35\d{3})\d{11}$/g.test(value)) {
    return "JCB";
  }

  return "NotFound";
};

export const getPaymentCardOutput = (value: string) => {
  const cardType = detectCardType(value);
  const securedCardNumber = `**** **** **** ${value.slice(12, 16)}`;

  return { cardType, securedCardNumber };
};
