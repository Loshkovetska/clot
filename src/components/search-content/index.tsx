"use client";

import { useCallback, useState } from "react";

import Header from "@/components/common/header";
import SearchBar from "@/components/common/searchbar";
import ProductsResult from "@/components/products-result";
import Filters from "@/components/search-content/filters";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/lib/hooks/useSearch";
import { onFilterChange } from "@/lib/utils/filter";
import { FilterType, FilterValuesType } from "@/types/filter";

export default function SearchContent({ slug }: { slug?: string }) {
  const [filters, setFilters] = useState<FilterType>({});

  const { productsList, currentPage, isFetching, fetchNextPage } = useSearch({
    slug,
    filters,
  });

  const handleFilterChange = useCallback(
    (key: keyof FilterType, value: FilterValuesType) => {
      setFilters((prev) => onFilterChange(key, value, prev));
    },
    []
  );

  return (
    <>
      <Header>
        <SearchBar formClassName="ml-[50px]" />
      </Header>
      <div className="mt-4 flex w-full grow flex-col gap-4">
        <Filters
          chosenFilters={filters}
          handleValueChange={handleFilterChange}
          resetFilters={() => setFilters({})}
        />
        {!!currentPage?.totalCount && (
          <span className="text-sm">
            {currentPage?.totalCount} Result
            {currentPage?.totalCount > 1 ? "s" : ""} Found
          </span>
        )}
        <ProductsResult
          type="search"
          data={productsList || []}
          isLoading={isFetching}
        />
        {currentPage?.hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            size="lg"
            className="mx-auto mt-4 w-full max-w-[240px] rounded-[100px]"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}
