import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { CategoryType } from "@/types/category";

class CategoryServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async getCategories(amount: number = 5): Promise<CategoryType[]> {
    const response = await this.routeClient.get("categories", {
      params: { amount },
    });

    return response.data;
  }
}

const CategoryService = new CategoryServiceClass();

export default CategoryService;
