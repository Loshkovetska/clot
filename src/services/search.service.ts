import { AxiosInstance } from "axios";

import { ROUTE_CLIENT } from "@/lib/config/requests";
import { SearchParams, SearchResultType } from "@/types/search";

class SearchServiceClass {
  private routeClient: AxiosInstance;

  constructor() {
    this.routeClient = ROUTE_CLIENT;
  }

  async searchProducts(params: SearchParams): Promise<SearchResultType> {
    const response = await this.routeClient.get("search", {
      params,
    });

    return response.data;
  }
}

const SearchService = new SearchServiceClass();

export default SearchService;
