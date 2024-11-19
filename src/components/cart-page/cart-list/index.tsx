import CartItem from "@/components/cart-page/cart-list/cart-item";
import { Button } from "@/components/ui/button";

export default function CartList() {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="transparent"
        className="self-end"
      >
        Remove All
      </Button>
      <div className="flex flex-col gap-2">
        <CartItem />
      </div>
    </div>
  );
}
