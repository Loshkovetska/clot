import { FILTERS } from "@/lib/constants/filters";
import { FilterType, FilterValuesType } from "@/types/filter";

export const getCurrentValueOutput = (
  value: FilterValuesType,
  filterKey: keyof FilterType
) => {
  if (filterKey !== "price") {
    const title = FILTERS[filterKey as "deals"].find(
      (item) => item.key === value
    )?.title;
    return title;
  }

  const price = value as FilterType["price"];

  if (price?.min && price?.max) {
    if (price.min === price.max) return `$${price?.max}`;
    return `$${price?.min}-$${price?.max}`;
  }

  return price?.min
    ? `from $${price?.min}`
    : price?.max
      ? `to $${price?.max}`
      : undefined;
};

export const onFilterChange = (
  key: keyof FilterType,
  value: FilterValuesType,
  prev: FilterType
) => {
  const isEmptyValue =
    prev[key] === value ||
    (key === "price" &&
      !(value as FilterType["price"])?.min &&
      !(value as FilterType["price"])?.max);

  const newState = {
    ...prev,
    [key]: isEmptyValue ? undefined : value,
  };

  const chosen = Object.entries(newState).filter(
    ([_, stateValue]) => !stateValue
  );

  chosen.forEach(([key, _]) => {
    delete newState[key as "sort-by"];
  });

  return newState;
};

export const formateFiltersString = (filters: FilterType, slug?: string) => {};
