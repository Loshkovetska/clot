import { AddressType } from "@/types/address";
import { CombinationType, ProductType } from "@/types/product";

type OrdersParams = {
  page: number;
  filter: OrderItemStatusType;
};

type AddOrderParams = {
  address_id: string;
  card_id: string;
  items: {
    product_id: string;
    combination: CombinationType;
    amount: number;
  }[];
  total_price: number;
  total_tax: number;
  total_unitprice: number;
  total_shipping: number;
  total_discount: number;
};

type OrdersResultType = {
  orders: OrderItemType[];
  page: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type OrderItemType = {
  id: string;
  order_number: number;
  order_status: OrderItemStatusType;
  tracking: string;
  items: OrderCartItemType[];
  address: AddressType;
  total_price: number;
  total_tax: number;
  total_unitprice: number;
  total_shipping: number;
  total_discount: number;
};

type OrderCartItemType = {
  product: ProductType;
  combination: CombinationType;
  order_id: string;
  amount: number;
};

enum OrderItemStatusEnum {
  "Processing" = "Processing",
  "Shipped" = "Shipped",
  "Returned" = "Returned",
  "Canceled" = "Canceled",
}

type OrderItemStatusType = keyof typeof OrderItemStatusEnum;

type TrackingType = {
  date: Date | null;
  status: "Order Placed" | "Order Confirmed" | "Shipped";
};

export {
  OrderItemStatusEnum,
  type AddOrderParams,
  type OrderCartItemType,
  type OrderItemStatusType,
  type OrderItemType,
  type OrdersParams,
  type OrdersResultType,
  type TrackingType,
};
