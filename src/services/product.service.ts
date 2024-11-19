import { ROUTE_CLIENT } from "@/lib/config/requests";
import { ProductType, ProductsSearchParams } from "@/types/product";
import { AxiosInstance } from "axios";

class ProductServiceClass {
  private routeClient: AxiosInstance;
  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }
  async getProductsByFilters(
    params: ProductsSearchParams
  ): Promise<ProductType[]> {
    const response = await this.routeClient.get("products/by-filter", {
      params: { amount: 20, ...params },
    });
    return response.data;
  }
}

const ProductService = new ProductServiceClass();

export default ProductService;
