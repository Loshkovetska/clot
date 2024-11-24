import { FILTERS } from "@/lib/constants/filters";

type FilterType = {
  "sort-by"?: "price-asc" | "price-desc" | "high-rated" | "new" | "top-selling";
  gender?: "kids" | "male" | "female";
  deals?: "sale" | "free-shipping";
  price?: { min?: number; max?: number };
};

type FilterValuesType =
  | FilterType["gender"]
  | FilterType["price"]
  | FilterType["sort-by"]
  | FilterType["deals"];

type FiltersPropType = {
  chosenFilters: FilterType;
  resetFilters?: () => void;
  handleValueChange: (key: keyof FilterType, value: FilterValuesType) => void;
};

type FilterItemPropType = {
  title: string;
  filterKey: keyof typeof FILTERS;
} & FiltersPropType;

export type {
  FilterItemPropType,
  FilterType,
  FilterValuesType,
  FiltersPropType,
};
