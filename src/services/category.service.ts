import { CategoryType } from "@/types/category";

class CategoryServiceClass {
  private routeClient;
  constructor() {
    this.routeClient = "";
  }
  async getCategories(): Promise<CategoryType[]> {
    return [];
  }
}

const CategoryService = new CategoryServiceClass();

export default CategoryService;
