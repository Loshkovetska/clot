import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { AddToCartParams } from "@/types/cart";

class CartServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async addProductToCart(params: AddToCartParams): Promise<string> {
    const response = await this.routeClient.post("cart", params);

    return response.data;
  }
}

const CartService = new CartServiceClass();

export default CartService;
