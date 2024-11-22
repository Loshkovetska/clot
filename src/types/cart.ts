import { ProductType } from "@/types/product";

type AddToCartParams = {
  product_id: string;
  combination: string;
  amount: number;
};

type CartResponseType = {
  cartItems: CartItemType[];
  cartSummary: CartSummaryType;
};

type CartSummaryType = {
  subTotal: number;
  totalPrice: number;
  taxCost: number;
  shippingCost: number;
  discount?: number;
};

type CartItemType = {
  amount: number;
  combination: string;
  id: string;
  product: ProductType;
  product_id: string;
  user_id: string;
  discount: number;
};

type UpdateCartParams = {
  id: string;
  amount: number;
};

type ApplyCouponParams = { coupon: string };

type DeleteCartParams = {
  id?: string;
};

export type {
  AddToCartParams,
  ApplyCouponParams,
  CartItemType,
  CartResponseType,
  CartSummaryType,
  DeleteCartParams,
  UpdateCartParams,
};
