import { getProductPrice } from "@/lib/utils/number";
import { CartItemType } from "@/types/cart";

export const getCartSummary = (items?: CartItemType[]) => {
  if (!items)
    return {
      subTotal: 0,
      totalPrice: 0,
      taxCost: 0,
      shippingCost: 0,
      discount: 0,
    };

  const subTotal = items.reduce((prevItem, currItem) => {
    const productVariant = JSON.parse(currItem.combination);
    const price = getProductPrice(
      productVariant.price,
      productVariant.discount
    );
    return prevItem + price * currItem.amount;
  }, 0);

  const taxCost = items.reduce((prevItem, currItem) => {
    return prevItem + currItem.product.taxCost;
  }, 0);

  const shippingCost = items.reduce((prevItem, currItem) => {
    return prevItem + currItem.product.shippingCost;
  }, 0);

  const discount = items.find((item) => item.discount)?.discount || 0;

  const oldPrice = subTotal + taxCost + shippingCost;

  const totalPrice = discount
    ? oldPrice - getProductPrice(oldPrice, discount)
    : oldPrice;

  return {
    subTotal,
    totalPrice,
    taxCost,
    shippingCost,
    discount: getProductPrice(oldPrice, discount),
  };
};

export const getCartItemInfo = (cartItem: CartItemType) => {
  const productVariant = JSON.parse(cartItem.combination);
  const totalPrice =
    getProductPrice(productVariant.price, productVariant.discount) *
    cartItem.amount;

  const variant = Object.entries(productVariant)
    .filter(([key]) => !["amount", "price", "discount"].includes(key))
    .map(([key, value]) => [`${key[0].toUpperCase()}${key.slice(1)}`, value]);

  const amount = Object.entries(productVariant).find(
    ([key]) => key === "amount"
  );

  return { totalPrice, variant, availableAmount: Number(amount?.[1] || 5) };
};
