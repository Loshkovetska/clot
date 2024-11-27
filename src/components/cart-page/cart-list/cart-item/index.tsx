import Image from "next/image";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import Counter from "@/components/common/counter";
import useCart from "@/lib/hooks/useCart";
import { getCartItemInfo } from "@/lib/utils/cart";
import { CartItemType } from "@/types/cart";

export default function CartItem(cartItem: CartItemType) {
  const { product, amount } = cartItem;

  const { updateCart, deleteCartItems, isPending } = useCart({
    enabled: false,
  });

  const { totalPrice, variant, availableAmount } = useMemo(
    () => getCartItemInfo(cartItem),
    [cartItem]
  );

  const handleUpdateAmount = useCallback(
    (num: number) => {
      if (amount + num > availableAmount) {
        return toast.error("The amount is unavailable!");
      }
      if (!(amount + num)) {
        return deleteCartItems({ id: cartItem.id });
      }

      updateCart({
        id: cartItem.id,
        amount: amount + num,
      });
    },
    [amount, availableAmount, cartItem, updateCart, deleteCartItems]
  );

  return (
    <div className="flex w-full items-center gap-3 rounded-lg bg-light-100 p-2">
      <div className="relative h-16 min-w-16 max-w-16 overflow-hidden rounded-sm">
        <Image
          src={
            process.env.NEXT_PUBLIC_SUPABASE_STORAGE +
            `/${product.imageUrls?.[0]}`
          }
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex grow flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">{product.title}</span>
          <span className="text-sm font-bold">${totalPrice}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {variant.map((sub: any) => (
              <div key={sub[0]}>
                <span className="text-sm text-black-50">{sub[0]}</span>
                {" - "}
                <span className="text-sm font-bold ">{sub[1]}</span>
              </div>
            ))}
          </div>
          <Counter
            loading={isPending}
            count={amount}
            handleCountChange={handleUpdateAmount}
            variant="icon-sm"
            disabledPlus={amount === 5}
          />
        </div>
      </div>
    </div>
  );
}
