import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { PaymentCardType } from "@/types/card";

class PaymentCardServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async getCards(): Promise<PaymentCardType[]> {
    const response = await this.routeClient.get("cards");

    return response.data;
  }

  async addCard(params: Partial<PaymentCardType>): Promise<PaymentCardType> {
    const response = await this.routeClient.post("cards", params);

    return response.data;
  }

  async updateCard(params: Partial<PaymentCardType>): Promise<any> {
    const response = await this.routeClient.put("cards", params);

    return response.data;
  }

  async deleteCard(id: string): Promise<any> {
    const response = await this.routeClient.delete("cards", {
      data: { id },
    });

    return response.data;
  }
}

const PaymentCardService = new PaymentCardServiceClass();

export default PaymentCardService;
