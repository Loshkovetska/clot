import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { QUERY_KEYS } from "@/lib/constants/querykeys";
import SearchService from "@/services/search.service";
import { FilterType } from "@/types/filter";

type useSearchParams = {
  slug?: string;
  filters: FilterType;
};

export const useSearch = ({ slug, filters }: useSearchParams) => {
  const searchParams = useSearchParams();

  const filtersParams = useMemo(
    () => ({
      "sort-by":
        filters["sort-by"] ||
        (searchParams.get("sort-by") as FilterType["sort-by"]),
      gender: filters.gender,
      deals: filters.deals,
      price_min: filters.price?.min,
      price_max: filters.price?.max,
      slug,
      q: searchParams.get("q") || undefined,
    }),
    [filters, slug, searchParams]
  );

  const filtersString = useMemo(
    () => JSON.stringify(filtersParams),
    [filtersParams]
  );

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.SEARCH,
      slug,
      filters.deals,
      filters.gender,
      filters.price,
      filters["sort-by"],
    ],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      SearchService.searchProducts({
        page: pageParam,
        ...filtersParams,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 < lastPage.totalPages
        ? lastPage.page + 1
        : lastPage.totalPages,
    getPreviousPageParam: (firstPage) => firstPage.page - 1,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [filtersString, refetch]);

  const currentPage = useMemo(
    () => data?.pages?.[data?.pages.length - 1],
    [data]
  );

  const productsList = useMemo(
    () => data?.pages.flatMap((dt) => dt.products),
    [data]
  );

  return {
    productsList,
    currentPage,
    isFetchingNextPage,
    isFetching: isFetching || isLoading,
    fetchNextPage,
  };
};
