import { CombinationType, ProductType } from "@/types/product";

type AddToCartParams = {
  product_id: string;
  combination: CombinationType;
  amount: number;
};

type CartResponseType = {
  cartItems: CartItemType[];
  cartSummary: CartSummaryType;
  appliedDiscount: boolean;
};

type CartSummaryType = {
  subTotal: number;
  totalPrice: number;
  taxCost: number;
  shippingCost: number;
  discount?: number;
};

type CartItemType = {
  combination: CombinationType;
  id: string;
  product: ProductType;
  user_id: string;
  amount: number;
  coupon: {
    discount: number;
  };
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
