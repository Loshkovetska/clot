import { ProductType } from "@/types/product";

type AddToCartParams = {
  product_id: string;
  combination: string;
  amount: number;
};

type CartItemType = {
  amount: number;
  combination: string;
  id: string;
  product: ProductType;
  product_id: string;
  user_id: string;
};

type UpdateCartParams = {
  id: string;
  amount: number;
};

type DeleteCartParams = {
  id?: string;
};

export type {
  AddToCartParams,
  CartItemType,
  DeleteCartParams,
  UpdateCartParams,
};
