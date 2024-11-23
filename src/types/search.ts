import { FilterType } from "@/types/filter";
import { ProductType } from "@/types/product";

type SearchParams = {
  slug?: string;
  page: number;
  gender?: FilterType["gender"];
  deals?: FilterType["deals"];
  price_min?: number;
  price_max?: number;
  "sort-by"?: FilterType["sort-by"];
  q?: string;
};

type SearchResultType = {
  products: ProductType[];
  page: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type { SearchParams, SearchResultType };
