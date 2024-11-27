import { useMemo } from "react";

import { CloseIcon, FilterIcon } from "@/components/icons";
import FilterItem from "@/components/search-content/filters/filter-item";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import { cn } from "@/lib/utils";
import { FiltersPropType } from "@/types/filter";

export default function Filters({
  chosenFilters,
  handleValueChange,
  resetFilters,
}: FiltersPropType) {
  const filtersCount = useMemo(
    () =>
      Object.keys(chosenFilters).length
        ? Object.keys(chosenFilters).length
        : null,
    [chosenFilters]
  );

  return (
    <ScrollArea className="max-lg:-mx-6 max-lg:max-w-[calc(100%+48px)] ">
      <div className="flex w-full items-center gap-1 max-lg:px-6">
        <Button
          className={cn(
            "rounded-[100px]",
            !filtersCount ? "pointer-events-none" : ""
          )}
          size="default_sm"
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
          title="Deals"
          filterKey="deals"
          chosenFilters={chosenFilters}
          handleValueChange={handleValueChange}
        />
        <FilterItem
          title="Price"
          filterKey="price"
          chosenFilters={chosenFilters}
          handleValueChange={handleValueChange}
        />
        <FilterItem
          title="Sort By"
          filterKey="sort-by"
          chosenFilters={chosenFilters}
          handleValueChange={handleValueChange}
        />
        <FilterItem
          title="Gender"
          filterKey="gender"
          chosenFilters={chosenFilters}
          handleValueChange={handleValueChange}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
