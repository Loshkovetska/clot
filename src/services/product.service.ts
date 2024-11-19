import { ProductType } from "@/types/product";

class ProductServiceClass {
  private routeClient;
  constructor() {
    this.routeClient = "";
  }
  async getProductsByFilters(): Promise<ProductType[]> {
    return [];
  }
}

const ProductService = new ProductServiceClass();

export default ProductService;
