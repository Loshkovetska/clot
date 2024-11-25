import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { AddressType } from "@/types/address";

class AddressServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async getAddresses(): Promise<AddressType[]> {
    const response = await this.routeClient.get("addresses");

    return response.data;
  }

  async addAddress(params: Partial<AddressType>): Promise<any> {
    const response = await this.routeClient.post("addresses", params);

    return response.data;
  }

  async updateAddress(params: Partial<AddressType>): Promise<any> {
    const response = await this.routeClient.put("addresses", params);

    return response.data;
  }

  async deleteAddress(id: string): Promise<any> {
    const response = await this.routeClient.delete("addresses", {
      data: { id },
    });

    return response.data;
  }
}

const AddressService = new AddressServiceClass();

export default AddressService;
