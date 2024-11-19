import { useMemo } from "react";

export default function ProductPrice({
  price = 0,
  discount = 0,
}: {
  price: number;
  discount: number;
}) {
  const newPrice = useMemo(() => price * (discount / 100), [price, discount]);
  return (
    <div className="flex items-center gap-2">
      <span className="text-md font-bold">
        ${(newPrice || price).toFixed(2)}
      </span>
      {newPrice > 0 && (
        <span className="text-md line-through font-medium text-black-50">
          ${price.toFixed(2)}
        </span>
      )}
    </div>
  );
}
