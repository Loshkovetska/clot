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
    const productVariant = currItem.combination;
    const price = getProductPrice(
      Number(productVariant.price),
      Number(productVariant.discount || 0)
    );
    return prevItem + price * currItem.amount;
  }, 0);

  const taxCost = items.reduce((prevItem, currItem) => {
    return prevItem + currItem.product.taxCost;
  }, 0);

  const shippingCost = items.reduce((prevItem, currItem) => {
    return prevItem + currItem.product.shippingCost;
  }, 0);

  const discount = items.find((item) => item.coupon)?.coupon?.discount || 0;

  const oldPrice = subTotal + taxCost + shippingCost;

  const totalPrice = discount
    ? oldPrice - getProductPrice(oldPrice, discount)
    : oldPrice;

  return {
    subTotal,
    totalPrice,
    taxCost,
    shippingCost,
    discount: discount ? getProductPrice(oldPrice, discount) : 0,
  };
};

export const getCartItemInfo = (cartItem: CartItemType) => {
  const productVariant = cartItem.combination;
  const totalPrice =
    getProductPrice(
      Number(productVariant.price),
      Number(productVariant.discount || 0)
    ) * cartItem.amount;

  const variant = Object.entries(productVariant)
    .filter(([key]) => !["amount", "price", "discount"].includes(key))
    .map(([key, value]) => [`${key[0].toUpperCase()}${key.slice(1)}`, value]);

  const amount = Object.entries(productVariant).find(
    ([key]) => key === "amount"
  );

  return { totalPrice, variant, availableAmount: Number(amount?.[1] || 5) };
};
