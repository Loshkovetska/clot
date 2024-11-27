import CartItem from "@/components/cart-page/cart-list/cart-item";
import { ChevronLeftIcon, OrdersIcon } from "@/components/icons";
import { CollapseBlock } from "@/components/ui/collapsible";
import { OrderCartItemType } from "@/types/order";

export default function OrderItems({ items }: { items: OrderCartItemType[] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-md font-bold">Order Items</span>
      <CollapseBlock
        trigger={
          <div className="flex w-full items-center justify-between rounded-lg bg-light-100 px-3 py-4">
            <div className="flex items-center gap-3">
              <OrdersIcon />
              {items.length} item{items.length > 1 ? "s" : ""}
            </div>
            <ChevronLeftIcon className="-rotate-90" />
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              combination={item.combination}
              amount={item.amount}
              isOrderItem
            />
          ))}
        </div>
      </CollapseBlock>
    </div>
  );
}
