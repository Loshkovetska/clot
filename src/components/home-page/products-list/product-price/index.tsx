import { cn } from "@/lib/utils";
import { useMemo } from "react";

type ProductPricePropType = {
  price: number;
  discount: number;
  priceClassName?: string;
  mainPriceClassName?: string;
};

export default function ProductPrice({
  price = 0,
  discount = 0,
  priceClassName,
  mainPriceClassName,
}: ProductPricePropType) {
  const newPrice = useMemo(() => price * (discount / 100), [price, discount]);
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn("text-md font-bold", priceClassName, mainPriceClassName)}
      >
        ${(newPrice || price).toFixed(2)}
      </span>
      {newPrice > 0 && (
        <span
          className={cn(
            "text-md line-through font-medium text-black-50",
            priceClassName
          )}
        >
          ${price.toFixed(2)}
        </span>
      )}
    </div>
  );
}
