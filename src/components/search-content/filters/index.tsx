import { useMemo } from "react";

import { CloseIcon, FilterIcon } from "@/components/icons";
import FilterItem from "@/components/search-content/filters/filter-item";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { FiltersPropType } from "@/types/filter";

export default function Filters({
  chosenFilters,
  handleValueChange,
  resetFilters,
}: FiltersPropType) {
  const queryCheck = useMediaQuery("(min-width: 1024px)");
  const filtersCount = useMemo(
    () =>
      Object.keys(chosenFilters).length
        ? Object.keys(chosenFilters).length
        : null,
    [chosenFilters]
  );

  const isDesktop = typeof window !== "undefined" ? queryCheck : true;
  return (
    <div className="flex w-full items-center gap-1">
      <Button
        className={cn(
          "rounded-[100px]",
          !filtersCount ? "pointer-events-none" : ""
        )}
        size={isDesktop ? undefined : "sm"}
        variant={filtersCount ? "default" : "outline"}
      >
        <FilterIcon
          className={filtersCount ? "stroke-white" : "stroke-black-100"}
        />
        {filtersCount}{" "}
        {filtersCount && (
          <CloseIcon
            className="[&>*]:stroke-white [&>*]:stroke-1"
            onClick={() => resetFilters?.()}
          />
        )}
      </Button>
      <FilterItem
        isDesktop={isDesktop}
        title="Deals"
        filterKey="deals"
        chosenFilters={chosenFilters}
        handleValueChange={handleValueChange}
      />
      <FilterItem
        isDesktop={isDesktop}
        title="Price"
        filterKey="price"
        chosenFilters={chosenFilters}
        handleValueChange={handleValueChange}
      />
      <FilterItem
        isDesktop={isDesktop}
        title="Sort By"
        filterKey="sort-by"
        chosenFilters={chosenFilters}
        handleValueChange={handleValueChange}
      />
      <FilterItem
        isDesktop={isDesktop}
        title="Gender"
        filterKey="gender"
        chosenFilters={chosenFilters}
        handleValueChange={handleValueChange}
      />
    </div>
  );
}
