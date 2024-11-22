import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import {
  AddToCartParams,
  ApplyCouponParams,
  CartResponseType,
  DeleteCartParams,
  UpdateCartParams,
} from "@/types/cart";

class CartServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async addProductToCart(params: AddToCartParams): Promise<string> {
    const response = await this.routeClient.post("cart", params);

    return response.data;
  }

  async getCart(): Promise<CartResponseType> {
    const response = await this.routeClient.get("cart");

    return response.data;
  }

  async updateCart(params: UpdateCartParams): Promise<string> {
    const response = await this.routeClient.put("cart", params);

    return response.data;
  }

  async applyCoupon(params: ApplyCouponParams): Promise<string> {
    const response = await this.routeClient.put("cart", params);

    return response.data;
  }

  async deleteCartItems(params: DeleteCartParams): Promise<string> {
    const response = await this.routeClient.delete("cart", {
      data: params,
    });

    return response.data;
  }
}

const CartService = new CartServiceClass();

export default CartService;
