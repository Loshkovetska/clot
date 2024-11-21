import { ROUTE_CLIENT } from "@/lib/config/requests";
import { ProductType, ProductsSearchParams } from "@/types/product";
import { AddReviewParams, ReviewType } from "@/types/review";
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

  async getProductBySlug(slug: string): Promise<ProductType> {
    const response = await this.routeClient.get(`products/${slug}`);
    return response.data;
  }
  async getProductReviewsById(id: string): Promise<ReviewType[]> {
    const response = await this.routeClient.get("products/reviews", {
      params: { id },
    });
    return response.data;
  }

  async addReview(params: AddReviewParams): Promise<any> {
    const response = await this.routeClient.post("products/reviews", params);
    return response.data;
  }
}

const ProductService = new ProductServiceClass();

export default ProductService;
