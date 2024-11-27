import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { AddOrderParams, OrdersParams, OrdersResultType } from "@/types/order";

class OrderServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async getOrders(params: OrdersParams): Promise<OrdersResultType> {
    const response = await this.routeClient.get("orders", {
      params,
    });

    return response.data;
  }

  async createOrder(params: AddOrderParams): Promise<string> {
    const response = await this.routeClient.post("orders", params);

    return response.data;
  }
}

const OrderService = new OrderServiceClass();

export default OrderService;
