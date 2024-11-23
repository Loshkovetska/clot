import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { WishlistParams } from "@/types/fav";
import { ProductType } from "@/types/product";

class FavServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async doWishlistAction(params: WishlistParams): Promise<string> {
    let response;
    if (params.type === "add") {
      response = await this.routeClient.post("favorites", params);
    }

    if (params.type === "remove") {
      response = await this.routeClient.delete("favorites", {
        data: params,
      });
    }

    return response?.data;
  }

  async getWishlist(): Promise<ProductType[]> {
    const response = await this.routeClient.get("favorites");

    return response.data;
  }
}

const FavService = new FavServiceClass();

export default FavService;
