import { ChevronLeftIcon, OrderIcon } from "@/components/icons";
import { OrderItemType } from "@/types/order";

export default function OrderItem({ order }: { order: OrderItemType }) {
  return (
    <div className="flex w-full flex-col justify-between gap-1 rounded-lg bg-light-100 px-3 py-4">
      <div className="flex items-center gap-3">
        <OrderIcon />
        <div className="flex flex-col gap-0.5">
          <span>Order #{order.order_number}</span>
          <span className="text-sm text-black-50">
            {order.items.length} item{order.items.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <ChevronLeftIcon className="-rotate-90" />
    </div>
  );
}
