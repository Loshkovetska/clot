import { useCallback } from "react";

import CartItem from "@/components/cart-page/cart-list/cart-item";
import { Button } from "@/components/ui/button";
import useCart from "@/lib/hooks/useCart";
import { CartItemType } from "@/types/cart";

export default function CartList({ items }: { items: CartItemType[] }) {
  const { deleteCartItems } = useCart({ enabled: false });

  const handleDelete = useCallback((id?: string) => {
    deleteCartItems({ id });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="transparent"
        className="self-end"
        onClick={() => handleDelete()}
      >
        Remove All
      </Button>
      <div className="flex flex-col gap-2">
        {items?.map((item) => (
          <CartItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
