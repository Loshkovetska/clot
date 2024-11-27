import { useCallback, useMemo, useState } from "react";

import { CheckIcon, ChevronLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileDialog from "@/components/ui/mobile-dialog";
import { FILTERS } from "@/lib/constants/filters";
import { cn } from "@/lib/utils";
import { getCurrentValueOutput } from "@/lib/utils/filter";
import { FilterItemPropType } from "@/types/filter";

export default function FilterItem({
  title,
  filterKey,
  chosenFilters,
  handleValueChange,
}: FilterItemPropType) {
  const [dialogOpen, setOpen] = useState(false);
  const [priceValues, setValues] = useState({
    min: chosenFilters["price"]?.min || 0,
    max: chosenFilters["price"]?.max || 0,
  });

  const currentValue = useMemo(
    () => getCurrentValueOutput(chosenFilters[filterKey], filterKey),
    [chosenFilters, filterKey]
  );

  const handlePriceChange = useCallback(
    (value: string, type: "min" | "max") => {
      setValues((prev) => ({
        ...prev,
        [type]: value,
      }));
    },
    []
  );

  const handleConfirm = useCallback(() => {
    if (
      JSON.stringify(chosenFilters["price"]) === JSON.stringify(priceValues)
    ) {
      setValues({ min: 0, max: 0 });
    }
    handleValueChange(filterKey, priceValues);
    setOpen(false);
  }, [priceValues, chosenFilters, filterKey, handleValueChange]);

  return (
    <MobileDialog
      open={dialogOpen}
      onOpenChange={setOpen}
      title={title}
      trigger={
        <Button
          size="default_sm"
          variant={chosenFilters[filterKey] ? "default" : "outline"}
          className="rounded-[100px]"
        >
          {currentValue || title}{" "}
          <ChevronLeftIcon
            className={cn(
              "-rotate-90",
              chosenFilters[filterKey] ? "[&>*]:stroke-white" : ""
            )}
          />
        </Button>
      }
      buttonsBlock={
        filterKey === "price" ? (
          <Button
            size="lg"
            disabled={!priceValues?.min && !priceValues?.max}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        ) : undefined
      }
    >
      {FILTERS[filterKey]?.map((filter) => {
        const isSelected = chosenFilters[filterKey] === filter.key;
        return (
          <Button
            variant={isSelected ? "default" : "light"}
            size="lg"
            className="w-full justify-between"
            key={filter.id}
            onClick={() => {
              handleValueChange(filterKey, filter.key as any);
              setOpen(false);
            }}
          >
            {filter.title}
            <CheckIcon className={isSelected ? "opacity-100" : "opacity-0"} />
          </Button>
        );
      })}
      {!FILTERS[filterKey].length && (
        <>
          <Input
            placeholder="Min"
            sizeB="lg"
            variant="rounded"
            type="number"
            value={priceValues.min || " "}
            onChange={(e) => handlePriceChange(e.target.value, "min")}
          />
          <Input
            placeholder="Max"
            sizeB="lg"
            variant="rounded"
            type="number"
            value={priceValues.max || " "}
            onChange={(e) => handlePriceChange(e.target.value, "max")}
          />
        </>
      )}
    </MobileDialog>
  );
}
