export const getProductPrice = (price: number, discount: number) =>
  price * (discount / 100 || 1);
