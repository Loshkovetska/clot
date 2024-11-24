import { useMemo } from "react";

import { cn } from "@/lib/utils";

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
  const priceDiff = useMemo(() => price * (discount / 100), [price, discount]);
  const newPrice = useMemo(() => price - priceDiff, [priceDiff, price]);
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn("text-md font-bold", priceClassName, mainPriceClassName)}
      >
        ${(priceDiff ? newPrice : price).toFixed(2)}
      </span>
      {priceDiff > 0 && (
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
