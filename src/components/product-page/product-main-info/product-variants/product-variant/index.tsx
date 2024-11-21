import { useCallback, useMemo } from "react";

import { CheckIcon, ChevronLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import MobileDialog from "@/components/ui/mobile-dialog";
import { cn } from "@/lib/utils";
import { CombinationType, ProductVariantType } from "@/types/product";

type ProductVariantPropType = {
  name: string;
  id: string;
  values: ProductVariantType["attr_list"];
  currentCombination: CombinationType;
  handleVariantChange: (value: ProductVariantType["attr_list"][0]) => void;
};

export default function ProductVariant({
  name,
  values,
  currentCombination,
  id,
  handleVariantChange,
}: ProductVariantPropType) {
  const triggerContent = useCallback(
    (
      combination: ProductVariantType["attr_list"][0],
      isTrigger?: boolean,
      selected?: boolean
    ) =>
      typeof combination === "string" ? (
        <span className={cn("text-md font-bold", selected ? "text-white" : "")}>
          {combination}
        </span>
      ) : typeof combination === "object" ? (
        <>
          {!isTrigger && "name" in combination && (
            <span
              className={cn(
                "text-md font-medium",
                selected ? "text-white" : ""
              )}
            >
              {combination?.name}
            </span>
          )}
          {"valueHex" in combination && (
            <span
              className={cn(
                "size-4 rounded-full flex border-2",
                selected ? "border-white" : "border-transparent"
              )}
              style={{
                backgroundColor: combination?.valueHex,
              }}
            />
          )}
        </>
      ) : null,
    []
  );

  const isSelected = useCallback(
    (combination: ProductVariantType["attr_list"][0]) => {
      if (
        typeof combination === "string" &&
        currentCombination[id] === combination
      )
        return true;

      if (
        typeof combination === "object" &&
        "name" in combination &&
        currentCombination[id] === combination.name
      )
        return true;
      return false;
    },
    [currentCombination, id]
  );

  const trigger = useMemo(
    () => (
      <Button
        variant="light"
        size="lg"
        className="w-full gap-6 pr-5"
      >
        <div className="flex grow items-center justify-between">
          <span className="text-md">{name}</span>
          {triggerContent(
            currentCombination[id] as ProductVariantType["attr_list"][0],
            true
          )}
        </div>
        <span className="-rotate-90">
          <ChevronLeftIcon />
        </span>
      </Button>
    ),
    [currentCombination, name, id, triggerContent]
  );

  return (
    <MobileDialog
      trigger={trigger}
      title={name}
    >
      {values.map((combination, ind) => (
        <Button
          variant={isSelected(combination) ? "default" : "light"}
          size="lg"
          className={cn(
            "w-full",
            isSelected(combination) ? "pointer-events-none" : ""
          )}
          key={ind}
          onClick={() => handleVariantChange(combination)}
        >
          <div className="flex grow items-center justify-between">
            {triggerContent(combination, false, isSelected(combination))}
          </div>
          <CheckIcon
            className={isSelected(combination) ? "opacity-1" : "opacity-0"}
          />
        </Button>
      ))}
    </MobileDialog>
  );
}
